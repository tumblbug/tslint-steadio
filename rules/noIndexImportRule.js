"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoIndexImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-index-import',
        description: 'Forbids importing from index',
        rationale: 'Index can be omitted without any issues.',
        optionsDescription: 'Not configurable',
        options: null,
        optionExamples: [true],
        type: 'style',
        typescriptOnly: true,
        hasFix: false,
    };
    Rule.FAILURE_STRING = 'Do not include index in import paths';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoIndexImportsWalker = (function (_super) {
    tslib_1.__extends(NoIndexImportsWalker, _super);
    function NoIndexImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoIndexImportsWalker.prototype.visitImportDeclaration = function (node) {
        var moduleSpecifier = node.moduleSpecifier;
        if (tsutils_1.isStringLiteral(moduleSpecifier) && moduleSpecifier.getText().includes("index'")) {
            var fix = new Lint.Replacement(moduleSpecifier.getStart(), moduleSpecifier.getWidth(), moduleSpecifier.getText().replace("/index'", "'"));
            this.addFailureAtNode(moduleSpecifier, Rule.FAILURE_STRING, fix);
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoIndexImportsWalker;
}(Lint.RuleWalker));
