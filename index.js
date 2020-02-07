import React from 'react';
import { render } from 'react-dom';
import MonacoEditor, { MonacoDiffEditor } from 'react-monaco-editor';
// import what from 'monaco-editor/esm/vs/editor/browser/editorExtensions.js';
import { language as mysqlLanguage } from 'monaco-editor/esm/vs/basic-languages/mysql/mysql.js';
import vLang from './custom-language';
import vCompletion from './custom-completion';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';

const monthSalary = [
  {
    label: '一月工资',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
    insertText: '一月工资', // 我试了一下，如果没有此项，则无法插入
    detail: '一月工资',
  },
  {
    label: '二月工资',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
    insertText: '二月工资', // 我试了一下，如果没有此项，则无法插入
    detail: '二月工资',
  },
];
class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
      suggestions:[]
    };
    this.language = 'mylan';
    this.editor = '';
    this.monaco = '';
    this.textModel = {};
    this.syntaxCheck = this.syntaxCheck.bind(this);
    // this.suggestions = [];
  }

  // componentDidMount() {
  //   console.log(what.EditorExtensionsRegistry.getEditorActions());
  // }

  onChange = newValue => {
    // console.log('onChange->', newValue); // eslint-disable-line no-console
    // let str = newValue.substr(0, this.caretOffset + 1);
    // let reg = /19年薪资\.$/;
    // console.log(str,'🦄');
    // if (reg.test(str)) {
    //   this.editor.trigger('提示', 'editor.action.triggerSuggest', {});
    // }
    // this.syntaxCheck(newValue);
  };

  // 获取提示项
  fetchSuggestions = () => {
    const currentText = this.editor.getValue();
    let str = currentText.substr(0, this.caretOffset + 1);
    let reg = /19年薪资.$/;
    console.log('需要匹配的string->  ', str);
    if (reg.test(str)) {
      console.log('🐻🐻🐻🐻');
      this.suggestions = monthSalary;
    } else {
      console.log('😡😡😡😡');
      this.suggestions = vCompletion;
    }
    this.editor.trigger('提示', 'editor.action.triggerSuggest', {});
  };

  changeModelContent = e => {
    console.log('内容改变', this.editor.getValue());
    this.caretOffset = e.changes[0].rangeOffset; //获取光标位置
    // console.log(this.editor.getPosition());
    // console.log(e);
    // console.log(this.caretOffset);
    this.fetchSuggestions();
  };

  editorDidMount = (editor, monaco) => {
    editor.onDidChangeModelContent(this.changeModelContent);
    // console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    this.monaco = monaco;
    // 注册自定义语言
    monaco.languages.register({ id: this.language });
    // 为该自定义语言基本的Token
    // monaco.languages.setMonarchTokensProvider(this.language, {
    //   tokenizer: { root: [[/[{}]/, 'delimiter.bracket']] },
    // });
    monaco.languages.setMonarchTokensProvider(this.language, vLang);

    // 为该语言注册一个语言提示器--联想
    monaco.languages.registerCompletionItemProvider(this.language, {
      provideCompletionItems: () => {
        console.log('开始执行callback');
        return { suggestions: this.suggestions };
      },
    });
    // this.editor.trigger('提示', 'editor.action.triggerSuggest', {});

    // this.syntaxCheck(this.textModel);
    // editor.onDidChangeModelContent(e => {
    //   this.caretOffset = e.changes[0].rangeOffset; //获取光标位置
    //   this.value = editor.getValue(); //使value和其值保持一致
    // });
    // hover 上去提示
    // monaco.languages.registerHoverProvider(this.language, {
    //   provideHover(model, position, token) {
    //     console.log(model, position, token);
    //     return {
    //       range: new monaco.Range(
    //         1,
    //         1,
    //         model.getLineCount(),
    //         model.getLineMaxColumn(model.getLineCount()),
    //       ),
    //       // range: monaco.Range.fromPositions(
    //       //   model.getPositionAt(cursorInfo.token.position[0]),
    //       //   model.getPositionAt(cursorInfo.token.position[1] + 1),
    //       // ),
    //       contents: [
    //         // 悬浮的内容,可以有很多项
    //         { value: 'xxxxx' },
    //         { value: 'CCCCC' },
    //       ],
    //     };
    //   },
    // });

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
    // console.log(textModel, '🥶🥶');
    // if(JSON.stringify(this.textModel) === "{}"){
    //   return;
    // }
    return;
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
  /**
   *
   *
   * @memberof CodeEditor
   */
  handleClick = () => {
    const textModel = this.editor.getModel();
    // 定义一个19年薪资对象
    const salary = {
      title: '19年薪资',
      child: [{ text: '1月' }, { text: '2月' }, { text: '3月' }, { text: '4月' }],
    };
    this.editor.getModel().applyEdits([
      {
        range: monaco.Range.fromPositions(this.editor.getPosition()),
        text: salary.title,
      },
    ]);
    console.log(this.editor.getValue());
  };
  render() {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      // cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <div>
        <h2>简单的code</h2>
        <div>
          <button onClick={this.handleClick}>19年薪资</button>
        </div>
        <MonacoEditor
          height="400"
          width="800"
          language={this.language}
          // value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          // theme="vs-dark"
        />
      </div>
    );
  }
}

render(<CodeEditor />, document.getElementById('root'));
