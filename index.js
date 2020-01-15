import React from "react";
import { render } from "react-dom";
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";
import vLang from "./custom-language";
import vCompletion from "./custom-completion";

// 功能至少包括， 函数提示、语法高亮、语法检查、自定义下钻（点击某个定义名进到该定义的内容）
class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: ""
    };
    this.language = 'myl'
  }

  onChange = newValue => {
    // console.log("onChange", newValue); // eslint-disable-line no-console
  };

  editorDidMount = (editor, monaco) => {
    console.log('👹👹',monaco);
    // eslint-disable-next-line no-console
    // console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    const suggestions = [
      {
        label: "manster",
        kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
        insertText: "manster", // 我试了一下，如果没有此项，则无法插入
        detail: "任何文字提示"
      },
      {
        label: "测试2",
        insertText: "测试22",
        detail: "提示的文字"
      },
      {
        label: "测试3",
        insertText: "测试3",
        detail: "提示的文字"
      }
    ];
    // 注册自定义语言
    monaco.languages.register({ id: this.language });
    // 为该自定义语言基本的Token
    monaco.languages.setMonarchTokensProvider(this.language, vLang);
    // 为该语言注册一个语言提示器--联想
    monaco.languages.registerCompletionItemProvider(this.language, {
      provideCompletionItems: () => {
        return { suggestions: vCompletion.concat(suggestions) };
      }
    });
  };

  render() {
    const { code, theme } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false
    };

    return (
      <div>
        <MonacoEditor
          height="400"
          width='600'
          language={this.language}
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme="vs-dark"
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

render(<App />, document.getElementById("root"));
