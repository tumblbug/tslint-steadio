import * as Lint from 'tslint'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'required-fields-first',
    description: 'Forces required fields to be defined first in an interface',
    rationale:
      'Required properties are more important, and should therefore be listed first in an interface declaration',
    optionsDescription: 'Not configurable',
    options: null,
    optionExamples: [true],
    type: 'style',
    typescriptOnly: true,
    hasFix: false,
  }
  public static FAILURE_STRING = 'Place required properties first'

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new RequiredFieldsWalker(sourceFile, this.getOptions()))
  }
}

class RequiredFieldsWalker extends Lint.RuleWalker {
  public visitInterfaceDeclaration(node: ts.InterfaceDeclaration) {
    const firstOptionalMember = node.members.find(member => member.questionToken != undefined)
    if (firstOptionalMember) {
      const requiredMembers = this.getRequiredMembers(node)
      if (
        requiredMembers.length > 0 &&
        firstOptionalMember.pos <= requiredMembers[requiredMembers.length - 1].pos
      ) {
        const optionalMembers = this.getOptionalMembers(node)
        const replacement = this.toText(requiredMembers) + this.toText(optionalMembers)
        const fix = new Lint.Replacement(node.members[0].pos, replacement.length, replacement)
        this.addFailureAtNode(node, Rule.FAILURE_STRING, fix)
      }
    }
    super.visitInterfaceDeclaration(node)
  }

  private getRequiredMembers(node: ts.InterfaceDeclaration) {
    return node.members.filter(member => member.questionToken == undefined)
  }

  private getOptionalMembers(node: ts.InterfaceDeclaration) {
    return node.members.filter(member => member.questionToken != undefined)
  }

  private toText(nodes: ts.TypeElement[]): string {
    return nodes.map(node => node.getFullText()).join('')
  }
}
