// custom-completion.js
/* eslint-disable no-template-curly-in-string */
export default [
  /**   * 内置函数   */
  {
    label: 'manster',
    kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
    insertText: 'manster', // 我试了一下，如果没有此项，则无法插入
    detail: '任何文字提示',
  },
  {
    label: 'WSWITCH',
    kind: monaco.languages.CompletionItemKind.Function,
    // insertText: 'WSWITCH ',
    insertText: 'WSWITCH(${1:str1}, ${2: str2})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    // insertText: 'WSWITCH(${1:pattern})',
    detail: 'switch判断语句',
  },
  {
    label: 'isEqual',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'isEqual(${1:str1}, ${2: str2})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '判断str是否为空',
  },
  {
    label: 'BuyGoods()', //显示的提示名称
    kind: 1, //图标显示类型
    insertText: 'BuyGoods(CSTradeScriptContext context, StockPrice price)',
    childs: [
      //该方法的子类方法，可通过点语法调用
      {
        label: 'Goods1()',
        insertText: 'Goods1()',
      },
      {
        label: 'Goods2()',
        insertText: 'Goods2()',
      },
    ],
  },
  {
    label: 'abs',
    kind: monaco.languages.CompletionItemKind.Function, // 图标
    insertText: 'abs(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    detail: '求出相应数字的绝对值',
  },
  {
    label: 'sum',
    kind: monaco.languages.CompletionItemKind.Function,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: 'sum(${1:})',
    detail: '计算所有参数数值的和',
  },
  {
    label: 'round',
    kind: monaco.languages.CompletionItemKind.Function,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: 'round(${1:})',
    detail: '按指定位数 对数值进行四舍五入',
  },
  {
    label: 'rounddown',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'rounddown(${1:},1)',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    detail: '按指定位数四舍五入向下求整',
  },
  {
    label: 'roundup',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'roundup(${1:},1)',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    detail: '按指定位数四舍五入向上求整',
  },
  {
    label: 'sumif',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'sumif(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '根据pattern描述的正则表达式，从数据项中获取匹配的字符串',
  },
  {
    label: 'max',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'max(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '求一组数值中的最大值',
  },
  {
    label: 'min',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'min(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '求一组数值中的最小值',
  },
  {
    label: 'power',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'power(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '求幂次方',
  },
  {
    label: 'int',
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: 'int(${1:})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '将数值向下取整为最接近的整数',
  },


  // {
  //   label: 'getIniString',
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: 'getIniString(${1:sec}, ${2: key})',
  //   insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: '从ini类型的数据中，根据section和key，获取key对应的值，作为字符串返回',
  // },
  // {
  //   label: 'getIniInt',
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: 'getIniInt(${1:sec}, ${2: key})',
  //   insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: '从ini类型的数据中，根据section和key，获取key对应的值,，作为整数返回',
  // },
  // {
  //   label: 'testing',
  //   kind: monaco.languages.CompletionItemKind.Keyword,
  //   insertText: 'testing(${1:condition})',
  //   insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  // },
  // {
  //   label: 'getIniDouble',
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: 'getIniDouble(${1:sec}, ${2: key})',
  //   insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: '从ini类型的数据中，根据section和key，获取key对应的值，作为浮点数返回',
  // },
  // {
  //   label: "isEmpty",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "isEmpty(${1:str})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "判断str是否为空"
  // },
  // {
  //   label: "isEqual",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "isEqual(${1:str1}, ${2: str2})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "判断str是否为空"
  // },
  // {
  //   label: "isContain",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "isContain(${1:str})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "判断数据项中是否包含str"
  // },
  // {
  //   label: "getJsonInt",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "getJsonInt(${1:path})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "根据path获取JSON数据中作为整数返回的值"
  // },
  // {
  //   label: "getJsonDouble",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "getJsonDouble(${1:path})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "根据path获取JSON数据中作为整数返回的值"
  // },
  // {
  //   label: "getJsonSize",
  //   kind: monaco.languages.CompletionItemKind.Function,
  //   insertText: "getJsonSize(${1:path})",
  //   insertTextRules:
  //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  //   documentation: "根据path获取JSON数据中作为数组类型的数据的长度"
  // },
  /**   * 语句   */
  {
    label: 'IF-ELSE',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: ['IF ${1:condition} THEN', '\t$0', 'ELSE', '\t$0', 'END'].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If-Else Statement',
  },
  {
    label: 'WHILE-DO',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: ['WHILE ${1:condition} DO', '\t$0', 'END'].join('\n'),
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'WHILE-DO Statement',
  },
];
