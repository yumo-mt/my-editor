import { language as mysqlLanguage } from 'monaco-editor/esm/vs/basic-languages/mysql/mysql.js';
monaco.languages.registerCompletionItemProvider('mysql', {
    provideCompletionItems: function(model, position) {
        // get editor content before the pointer
        var textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
        });
        var match = textUntilPosition.match(/(\S+)$/);
        if (!match) return [];
        match = match[0].toUpperCase();
        var suggestions = [];
        mysqlLanguage.keywords.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: item
                });
            }
        });
        mysqlLanguage.operators.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Operator,
                    insertText: item
                });
            }
        });
        mysqlLanguage.builtinFunctions.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: item
                });
            }
        });
        return {
            suggestions
        };
    }
});