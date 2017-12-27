"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Lint = require("tslint");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new RequiredFieldsWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'required-fields-first',
        description: 'Forces required fields to be defined first in an interface',
        rationale: 'Required properties are more important, and should therefore be listed first in an interface declaration',
        optionsDescription: 'Not configurable',
        options: null,
        optionExamples: [true],
        type: 'style',
        typescriptOnly: true,
        hasFix: false,
    };
    Rule.FAILURE_STRING = 'Place required properties first';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RequiredFieldsWalker = (function (_super) {
    tslib_1.__extends(RequiredFieldsWalker, _super);
    function RequiredFieldsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequiredFieldsWalker.prototype.visitInterfaceDeclaration = function (node) {
        var firstOptionalMember = node.members.find(function (member) { return member.questionToken != undefined; });
        if (firstOptionalMember) {
            var requiredMembers = this.getRequiredMembers(node);
            if (requiredMembers.length > 0 &&
                firstOptionalMember.pos <= requiredMembers[requiredMembers.length - 1].pos) {
                var optionalMembers = this.getOptionalMembers(node);
                var replacement = this.toText(requiredMembers) + this.toText(optionalMembers);
                var fix = new Lint.Replacement(node.members[0].pos, replacement.length, replacement);
                this.addFailureAtNode(node, Rule.FAILURE_STRING, fix);
            }
        }
        _super.prototype.visitInterfaceDeclaration.call(this, node);
    };
    RequiredFieldsWalker.prototype.getRequiredMembers = function (node) {
        return node.members.filter(function (member) { return member.questionToken == undefined; });
    };
    RequiredFieldsWalker.prototype.getOptionalMembers = function (node) {
        return node.members.filter(function (member) { return member.questionToken != undefined; });
    };
    RequiredFieldsWalker.prototype.toText = function (nodes) {
        return nodes.map(function (node) { return node.getFullText(); }).join('');
    };
    return RequiredFieldsWalker;
}(Lint.RuleWalker));
