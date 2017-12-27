import * as Lint from 'tslint'
import * as ts from 'typescript'
import { isStringLiteral } from 'tsutils'

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'no-index-import',
    description: 'Forbids importing from index',
    rationale: 'Index can be omitted without any issues.',
    optionsDescription: 'Not configurable',
    options: null,
    optionExamples: [true],
    type: 'style',
    typescriptOnly: true,
    hasFix: false,
  }
  public static FAILURE_STRING = 'Do not include index in import paths'

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoIndexImportsWalker(sourceFile, this.getOptions()))
  }
}

class NoIndexImportsWalker extends Lint.RuleWalker {
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    const moduleSpecifier = node.moduleSpecifier
    if (isStringLiteral(moduleSpecifier) && moduleSpecifier.getText().includes("index'")) {
      const fix = new Lint.Replacement(
        moduleSpecifier.getStart(),
        moduleSpecifier.getWidth(),
        moduleSpecifier.getText().replace("/index'", "'")
      )
      this.addFailureAtNode(moduleSpecifier, Rule.FAILURE_STRING, fix)
    }
    super.visitImportDeclaration(node)
  }
}
