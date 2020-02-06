import React from 'react';
import { render } from 'react-dom';
import MonacoEditor, { MonacoDiffEditor } from 'react-monaco-editor';
import { language as mysqlLanguage } from 'monaco-editor/esm/vs/basic-languages/mysql/mysql.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import vLang from './custom-language';
import vCompletion from './custom-completion';

// 功能至少包括， 函数提示、语法高亮、语法检查、自定义下钻（点击某个定义名进到该定义的内容）
class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.language = 'mysql';
    this.editor = '';
    this.monaco = '';
    this.textModel = {};
    this.syntaxCheck = this.syntaxCheck.bind(this);
  }

  onChange = newValue => {
    console.log('onChange->', newValue); // eslint-disable-line no-console
    this.syntaxCheck(newValue);
  };

  suggest = () => {
    const currentValue = this.editor.getValue();
    console.log('👹👹', currentValue, this.value);
    return { suggestions: vCompletion };
  };

  editorDidMount = (editor, monaco) => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    this.monaco = monaco;
    // 注册自定义语言
    monaco.languages.register({ id: this.language });
    // 为该自定义语言基本的Token
    monaco.languages.setMonarchTokensProvider(this.language, vLang);

    // 为该语言注册一个语言提示器--联想
    // monaco.languages.registerCompletionItemProvider(this.language, {
    //   provideCompletionItems: this.suggest,
    //         // provideCompletionItems: () => {
    //         //   const currentValue = editor.getValue();
    //         //   console.log(currentValue);
    //         //   return { suggestions: vCompletion.concat(suggestions) };
    //         // },
    // });
    let textModel = {};
    this.textModel = textModel;
    monaco.languages.registerCompletionItemProvider('mysql', {
      provideCompletionItems: function(model, position) {
        // get editor content before the pointer
        var textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
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
              insertText: item,
            });
          }
        });
        mysqlLanguage.operators.forEach(item => {
          if (item.indexOf(match) !== -1) {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: item,
            });
          }
        });
        mysqlLanguage.builtinFunctions.forEach(item => {
          if (item.indexOf(match) !== -1) {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: item,
            });
          }
        });
        return {
          suggestions,
        };
      },
    });
    this.syntaxCheck(this.textModel);
    editor.onDidChangeModelContent(e => {
      this.caretOffset = e.changes[0].rangeOffset; //获取光标位置
      this.value = editor.getValue(); //使value和其值保持一致
    });
    // hover 上去提示
    monaco.languages.registerHoverProvider(this.language, {
      provideHover(model, position, token) {
        console.log(model, position, token);
        return {
          range: new monaco.Range(
            1,
            1,
            model.getLineCount(),
            model.getLineMaxColumn(model.getLineCount()),
          ),
          // range: monaco.Range.fromPositions(
          //   model.getPositionAt(cursorInfo.token.position[0]),
          //   model.getPositionAt(cursorInfo.token.position[1] + 1),
          // ),
          contents: [
            // 悬浮的内容,可以有很多项
            { value: 'xxxxx' },
            { value: 'CCCCC' },
          ],
        };
      },
    });

    // 设置代码
    // this.editor.setValue('function');

    // this.editor.trigger('提示', 'editor.action.triggerSuggest', { value: 'xxxxx' });
  };
  /**
   *
   * 语法检查
   */
  syntaxCheck = textValue => {
    // console.log(this.monaco);
    const textModel = this.editor.getModel();
    console.log(textModel, '🥶🥶');
    // if(JSON.stringify(this.textModel) === "{}"){
    //   return;
    // }
    this.monaco.editor.setModelMarkers(textModel, 'eslint', [
      {
        // startLineNumber: 2,
        // endLineNumber: 2,
        // startColumn: 2,
        // endColumn: 4,
        message: 'Syntax error',
        severity: 3,
        source: 'what',
        code: 'what',
      },
    ]);
  };
  render() {
    const { code, theme } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <div>
        <MonacoEditor
          height="400"
          width="600"
          language={this.language}
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          // theme="vs-dark"
        />
      </div>
    );
  }
}

const App = () => (
  <div>
    <h2>简单的code</h2>
    <CodeEditor />
  </div>
);

render(<App />, document.getElementById('root'));
