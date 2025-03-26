export const lowcodeDsl = {
  "version": "1.0.0",
  "componentsMap": [
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Input",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Input"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Detail",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Detail"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Title",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Title"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Col",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Col"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Row",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Row"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "DatePicker",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "DatePicker"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Radio",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Radio"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Select",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Select"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Cascader",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Cascader"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Checkbox",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Checkbox"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "SelectMultiple",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "SelectMultiple"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Reuse",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Reuse"
    },
    {
      "package": "@apaas-core/materials-safe-upload",
      "version": "0.1.0",
      "exportName": "SafePictureCard",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "SafePictureCard"
    },
    {
      "package": "@apaas-core/materials-staff-selector",
      "version": "0.1.0",
      "exportName": "PersonSelect",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "PersonSelect"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "FormAssociation",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "FormAssociation"
    },
    {
      "package": "@apaas-core/materials-base",
      "version": "3.9.0-beta.22",
      "exportName": "Page",
      "main": "src/index.tsx",
      "destructuring": true,
      "subName": "",
      "componentName": "Page"
    }
  ],
  "componentsTree": [
    {
      "componentName": "Page",
      "id": "node_ocm7yjbvcc1",
      "docId": "docm8mmpo8a",
      "props": {
        "__style__": {
          "padding": "16px"
        },
        "uniqueKeyForm": [],
        "showRequiredMark": true,
        "showProcess": true,
        "showComment": true,
        "init": true,
        "expandPoints": {
          "formItemExpandPoints": {
            "node_ocm8cre4l4d": {
              "id": "node_ocm8cre4l4d",
              "serviceCode": "dubbo02",
              "serviceName": "修改拓展点",
              "formItemValue": "单行文本1_node_ocm8cre4l4d"
            }
          }
        }
      },
      "fileName": "home",
      "dataSource": {
        "list": [
          {
            "type": "fetch",
            "isInit": true,
            "options": {
              "params": {},
              "method": "GET",
              "isCors": true,
              "timeout": 30000,
              "headers": {},
              "uri": "https://messenger.ssr.mihoyo.com/api/messenger/formmock"
            },
            "isPaasGlobal": false,
            "id": "dongtai001",
            "name": "动态数据源"
          }
        ]
      },
      "hidden": false,
      "title": "",
      "isLocked": false,
      "condition": true,
      "conditionGroup": "",
      "readonly": true,
      "required": false,
      "show": true,
      "locked": true,
      "children": [
        {
          "componentName": "Detail",
          "id": "node_ocm8gsxqgj1",
          "docId": "docm8mmpo8a",
          "props": {
            "label": "明细表",
            "showLabel": true,
            "customProps": {
              "isCustomWidth": true,
              "childrenWidth": {
                "_rowSelection": 32,
                "_lineIndex": 60,
                "_operation": 156
              },
              "showHeader": false
            },
            "uniqueKey": "node_ocm8gsxqgj1",
            "rowKey": "__lineKey__",
            "buttonConfig": {
              "add": {
                "show": true,
                "title": "新增"
              },
              "copy": {
                "show": true,
                "title": "复制"
              },
              "remove": {
                "show": true,
                "title": "删除"
              },
              "addition": {
                "show": true
              },
              "batchOpt": {
                "show": true
              },
              "batchImport": {
                "show": false,
                "allowImportConfig": false
              },
              "batchExport": {
                "show": false,
                "allowExportConfig": false
              }
            },
            "fastMode": false,
            "clientHeight": 300,
            "rowHeight": 32,
            "showSearch": false,
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Input",
              "id": "node_ocm8gsxqgj2",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本2222",
                "showLabel": true,
                "uniqueKey": "node_ocm8gsxqgj2",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            }
          ]
        },
        {
          "componentName": "Title",
          "id": "node_ocm8cre4l44",
          "docId": "docm8mmpo8a",
          "props": {
            "showLabel": false,
            "uniqueKey": "node_ocm8cre4l44",
            "label": "标题",
            "customProps": {
              "title": "条件复制"
            },
            "tracingPoint": false,
            "renderAsRcElement": false,
            "renderAsRcElementOutOfForm": false,
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": ""
        },
        {
          "componentName": "Row",
          "id": "node_ocm8cre4l48",
          "docId": "docm8mmpo8a",
          "props": {
            "style": {
              "display": "flex",
              "gap": "8px",
              "flexDirection": "row"
            },
            "uniqueKey": "node_ocm8cre4l48",
            "label": "栅格",
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Col",
              "id": "node_ocm8cre4l49",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8cre4l49",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre4l4d",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单行文本1",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre4l4d",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre4l4e",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单行文本2",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre4l4e",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre4l4f",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单行文本3",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre4l4f",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm8cre4l4a",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8cre4l4a",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre4l4s",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单行文本",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre4l4s",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre4l4t",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单行文本",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre4l4t",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            }
          ]
        },
        {
          "componentName": "Title",
          "id": "node_ocm8cre4l43",
          "docId": "docm8mmpo8a",
          "props": {
            "showLabel": false,
            "uniqueKey": "node_ocm8cre4l43",
            "label": "标题",
            "customProps": {
              "title": "日期时间被关联后不可删除"
            },
            "tracingPoint": false,
            "renderAsRcElement": false,
            "renderAsRcElementOutOfForm": false,
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": ""
        },
        {
          "componentName": "Row",
          "id": "node_ocm8cogz583",
          "docId": "docm8mmpo8a",
          "props": {
            "style": {
              "display": "flex",
              "gap": "8px",
              "flexDirection": "row"
            },
            "uniqueKey": "node_ocm8cogz583",
            "label": "栅格",
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Col",
              "id": "node_ocm8cogz584",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8cogz584",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8cogz581",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间A",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cogz581",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": []
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8cogz582",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间B",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cogz582",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": []
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm8cogz585",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8cogz585",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8cogz587",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cogz587",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": [],
                      "timeLimitType": "relative",
                      "disabledDate": "node_ocm8cogz581",
                      "disabledDateLast": "node_ocm8cogz582"
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8cre2ie3",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间---",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre2ie3",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": []
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            }
          ]
        },
        {
          "componentName": "Title",
          "id": "node_ocm871o6si1",
          "docId": "docm8mmpo8a",
          "props": {
            "showLabel": false,
            "uniqueKey": "node_ocm871o6si1",
            "init": true,
            "label": "标题",
            "customProps": {
              "title": "toText()  公式"
            },
            "tracingPoint": false,
            "renderAsRcElement": false,
            "renderAsRcElementOutOfForm": false
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": ""
        },
        {
          "componentName": "Row",
          "id": "node_ocm871o4ll1",
          "docId": "docm8mmpo8a",
          "props": {
            "style": {
              "display": "flex",
              "gap": "8px",
              "flexDirection": "row"
            },
            "uniqueKey": "node_ocm871o4ll1",
            "label": "栅格",
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Col",
              "id": "node_ocm871o4ll2",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm871o4ll2",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Radio",
                  "id": "node_ocm843w8vr1",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单选框--静态",
                    "showLabel": true,
                    "customProps": {
                      "enumKey": "paas.yesOrNo"
                    },
                    "uniqueKey": "node_ocm843w8vr1",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Radio",
                  "id": "node_ocm871o4ll4",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单选框--动态",
                    "showLabel": true,
                    "customProps": {
                      "enumKey": "company_place_sign"
                    },
                    "uniqueKey": "dxk_d",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Select",
                  "id": "node_ocm871o4ll5",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "下拉单选--静态",
                    "showLabel": true,
                    "uniqueKey": "xldx_j",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "customProps": {
                      "enumKey": "paas.yesOrNo"
                    },
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Select",
                  "id": "node_ocm871o4ll6",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "下拉单选--动态",
                    "showLabel": true,
                    "uniqueKey": "xldx_d",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "customProps": {
                      "enumKey": "company_place_sign"
                    },
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Cascader",
                  "id": "node_ocm871o4llb",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "级联选择--静态",
                    "showLabel": true,
                    "uniqueKey": "jlxz_j",
                    "encrypt": false,
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "customProps": {
                      "enumKey": "city"
                    },
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm871o4ll3",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm871o4ll3",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm7yjclpr1",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--单选框--静态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm7yjclpr1",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4lld",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--单选框--动态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4lld",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4lle",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--下拉单选--静态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4lle",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4llf",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--下拉单选--动态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4llf",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4llk",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--级联选择--静态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4llk",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm871o6si2",
              "docId": "docm8mmpo8a",
              "props": {
                "span": 12,
                "uniqueKey": "node_ocm871o6si2",
                "label": "列",
                "init": true
              },
              "title": "区块",
              "hidden": false,
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Checkbox",
                  "id": "node_ocm871o4ll7",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "复选框--静态",
                    "showLabel": true,
                    "uniqueKey": "fxk_j",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true,
                    "customProps": {
                      "enumKey": "paas.yesOrNo"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Checkbox",
                  "id": "node_ocm871o4ll8",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "复选框--动态",
                    "showLabel": true,
                    "uniqueKey": "fxk_d",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true,
                    "customProps": {
                      "enumKey": "company_place_sign"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "SelectMultiple",
                  "id": "node_ocm871o4ll9",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "下拉复选--静态",
                    "showLabel": true,
                    "uniqueKey": "xlfx_j",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true,
                    "customProps": {
                      "enumKey": "paas.yesOrNo"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "SelectMultiple",
                  "id": "node_ocm871o4lla",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "下拉复选--动态",
                    "showLabel": true,
                    "uniqueKey": "xlfx_d",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true,
                    "customProps": {
                      "enumKey": "company_place_sign"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Cascader",
                  "id": "node_ocm871o4llc",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "级联选择--动态",
                    "showLabel": true,
                    "uniqueKey": "jlxz_d",
                    "encrypt": false,
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true,
                    "customProps": {
                      "enumKey": "working_city"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm871o6si3",
              "docId": "docm8mmpo8a",
              "props": {
                "span": 12,
                "uniqueKey": "node_ocm871o6si3",
                "label": "列",
                "init": true
              },
              "title": "区块",
              "hidden": false,
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4llg",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--复选框--静态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4llg",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4llh",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--复选框--动态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4llh",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4lli",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--下拉复选--静态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4lli",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4llj",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--下拉复选--动态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4llj",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o4lll",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--级联选择--动态",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o4lll",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            }
          ]
        },
        {
          "componentName": "Row",
          "id": "node_ocm871o8xkm",
          "docId": "docm8mmpo8a",
          "props": {
            "style": {
              "display": "flex",
              "gap": "8px",
              "flexDirection": "row"
            },
            "uniqueKey": "node_ocm871o8xkm",
            "label": "栅格",
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Col",
              "id": "node_ocm871o8xkn",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm871o8xkn",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Radio",
                  "id": "node_ocm871o8xks",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单选框",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o8xks",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true,
                    "formDataSource": {
                      "type": "JSExpression",
                      "value": "this.dataSourceMap.dongtai001"
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8cre7b7e",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--中间件",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cre7b7e",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm871o8xko",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm871o8xko",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm871o8xkp",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--动态数据源",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o8xkp",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm871o6si4",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "toText--找不到key",
                    "showLabel": true,
                    "uniqueKey": "node_ocm871o6si4",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            }
          ]
        },
        {
          "componentName": "Detail",
          "id": "node_ocm7yjbvcc2",
          "docId": "docm8mmpo8a",
          "props": {
            "label": "明细表",
            "showLabel": true,
            "uniqueKey": "node_ocm7yjbvcc2",
            "customProps": {
              "isCustomWidth": true,
              "childrenWidth": {}
            },
            "rowKey": "__lineKey__",
            "buttonConfig": {
              "add": {
                "show": true,
                "title": "新增"
              },
              "copy": {
                "show": true,
                "title": "复制"
              },
              "remove": {
                "show": true,
                "title": "删除"
              },
              "addition": {
                "show": true
              },
              "batchOpt": {
                "show": true
              },
              "batchImport": {
                "show": false,
                "allowImportConfig": false
              },
              "batchExport": {
                "show": false,
                "allowExportConfig": false
              }
            },
            "fastMode": true,
            "clientHeight": 300,
            "rowHeight": 32,
            "showSearch": false,
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Input",
              "id": "node_ocm7yjpkfh1",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm7yjpkfh1",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup1",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup1",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup2",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup2",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup3",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup3",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup4",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup4",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup7",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup7",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup6",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup6",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            },
            {
              "componentName": "Input",
              "id": "node_ocm873hcup5",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm873hcup5",
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false,
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            }
          ]
        },
        {
          "componentName": "Reuse",
          "id": "node_ocm7yjbvcc3",
          "docId": "docm8mmpo8a",
          "props": {
            "label": "重复表",
            "showLabel": false,
            "customProps": {
              "showHeader": true
            },
            "uniqueKey": "node_ocm7yjbvcc3",
            "rowKey": "__lineKey__",
            "buttonConfig": {
              "expand": {
                "show": true
              },
              "addition": {
                "show": true,
                "title": "新增重复表"
              },
              "copy": {
                "show": true,
                "title": "复制"
              },
              "remove": {
                "show": true,
                "title": "删除"
              }
            },
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Input",
              "id": "node_ocm7yjpkfh2",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "单行文本",
                "showLabel": true,
                "uniqueKey": "node_ocm7yjpkfh2",
                "init": true,
                "encrypt": false,
                "customProps": {
                  "isTrim": true
                },
                "renderAsRcElement": false,
                "renderAsRcElementOutOfForm": false
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": ""
            }
          ]
        },
        {
          "componentName": "Title",
          "id": "node_ocm8767hkl1",
          "docId": "docm8mmpo8a",
          "props": {
            "showLabel": false,
            "uniqueKey": "node_ocm8767hkl1",
            "label": "标题",
            "customProps": {
              "title": "全局只读不触发计算赋值"
            },
            "tracingPoint": false,
            "renderAsRcElement": false,
            "renderAsRcElementOutOfForm": false,
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": ""
        },
        {
          "componentName": "Row",
          "id": "node_ocm8767hkl2",
          "docId": "docm8mmpo8a",
          "props": {
            "style": {
              "display": "flex",
              "gap": "8px",
              "flexDirection": "row"
            },
            "uniqueKey": "node_ocm8767hkl2",
            "label": "栅格",
            "init": true
          },
          "hidden": false,
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": "",
          "children": [
            {
              "componentName": "Col",
              "id": "node_ocm8767hkl3",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8767hkl3",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm8767hkl6",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "初始值",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767hkl6",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8767hkl7",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "状态条件",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767hkl7",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8767hkl8",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "自定义条件",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767hkl8",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "SafePictureCard",
                  "id": "node_ocm85bu9qw1",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "计算公式",
                    "showLabel": true,
                    "uniqueKey": "node_ocm85bu9qw1",
                    "customProps": {
                      "width": 102,
                      "height": 102,
                      "transparency": 35
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm8767hkl4",
              "docId": "docm8mmpo8a",
              "props": {
                "label": "列",
                "style": {},
                "uniqueKey": "node_ocm8767hkl4",
                "init": true
              },
              "hidden": false,
              "title": "",
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "Input",
                  "id": "node_ocm8767jbw6",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "自动关联--条件 ==1",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767jbw6",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm876pj4w1",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "自动关联--赋值",
                    "showLabel": true,
                    "uniqueKey": "node_ocm876pj4w1",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "PersonSelect",
                  "id": "node_ocm876plr54",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "人员选择",
                    "showLabel": true,
                    "uniqueKey": "node_ocm876plr54",
                    "encrypt": false,
                    "customProps": {
                      "type": "UC",
                      "clientId": "",
                      "multiple": false,
                      "scene": "",
                      "showResigned": false
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8767jbw7",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "外部数据源",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767jbw7",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8767jbw8",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "拓展点",
                    "showLabel": true,
                    "uniqueKey": "tzd",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "FormAssociation",
                  "id": "node_ocm8cybsyyb",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "关联表单",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cybsyyb",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "nodes": [],
                    "init": true,
                    "customProps": {
                      "accessGlobalDefKey": "aadb9c2651fa4c94a4e968d38bae7545",
                      "showStyleConfig": {
                        "showType": false,
                        "mainTitleFieldKey": "node_ocm876j3k33"
                      },
                      "accessFormFilterData": {
                        "oper": "AND",
                        "expressions": [],
                        "id": "0-0",
                        "parentUuid": "0",
                        "root": true
                      },
                      "matchFieldConfig": {
                        "matchFieldList": [
                          {
                            "id": "56f3c8c5-d8f4-4834-b18f-5b499930da17",
                            "sourceFieldKey": "node_ocm876j3k33",
                            "matchFieldKey": "node_ocm8cybsyye"
                          }
                        ],
                        "repeatTableFillRule": 0
                      },
                      "matchFieldList": [
                        {
                          "id": "56f3c8c5-d8f4-4834-b18f-5b499930da17",
                          "sourceFieldKey": "node_ocm876j3k33",
                          "matchFieldKey": "node_ocm8cybsyye"
                        }
                      ],
                      "systemKey": "node_ocm8cybsyyb",
                      "sourceFieldMap": {
                        "node_ocm876j3k33": {
                          "label": "单行文本",
                          "upperKey": "page",
                          "type": "input",
                          "systemKey": "node_ocm876j3k33",
                          "hidden": false,
                          "title": "",
                          "isLocked": false,
                          "condition": true,
                          "conditionGroup": "",
                          "showLabel": true,
                          "uniqueKey": "node_ocm876j3k33",
                          "encrypt": false,
                          "customProps": {
                            "isTrim": true
                          },
                          "renderAsRcElement": false,
                          "renderAsRcElementOutOfForm": false,
                          "init": true
                        }
                      },
                      "filterRuleType": 0,
                      "accessFormFilterRuleData": "",
                      "accessFormFilterRuleConfig": "",
                      "accessFormDefKey": "3587d2e60be44e71850e8d1949e98dfc",
                      "repeatTableFillRule": 0
                    }
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Input",
                  "id": "node_ocm8cybsyye",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "手动关联赋值",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8cybsyye",
                    "encrypt": false,
                    "customProps": {
                      "isTrim": true
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            },
            {
              "componentName": "Col",
              "id": "node_ocm8767hkl5",
              "docId": "docm8mmpo8a",
              "props": {
                "span": 12,
                "uniqueKey": "node_ocm8767hkl5",
                "label": "列",
                "init": true
              },
              "title": "区块",
              "hidden": false,
              "isLocked": false,
              "condition": true,
              "conditionGroup": "",
              "children": [
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8767jbwx",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间--上级",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767jbwx",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": []
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "DatePicker",
                  "id": "node_ocm8767jbw1j",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "日期时间--依赖",
                    "showLabel": true,
                    "uniqueKey": "node_ocm8767jbw1j",
                    "customProps": {
                      "format": "YYYY-MM-DD",
                      "format_hour": [],
                      "timeLimitType": "relative",
                      "disabledDate": "node_ocm8767jbwx"
                    },
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Radio",
                  "id": "node_ocm8767jbw1h",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单选框--上级",
                    "showLabel": true,
                    "customProps": {
                      "enumKey": "city"
                    },
                    "uniqueKey": "node_ocm8767jbw1h",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                },
                {
                  "componentName": "Radio",
                  "id": "node_ocm8767jbw1i",
                  "docId": "docm8mmpo8a",
                  "props": {
                    "label": "单选框--依赖",
                    "showLabel": true,
                    "customProps": {
                      "association": "node_ocm8767jbw1h"
                    },
                    "uniqueKey": "node_ocm8767jbw1i",
                    "encrypt": false,
                    "autoClearValue": false,
                    "previewMode": "text",
                    "renderAsRcElement": false,
                    "renderAsRcElementOutOfForm": false,
                    "tagColor": "processing",
                    "isTagBorder": true,
                    "init": true
                  },
                  "hidden": false,
                  "title": "",
                  "isLocked": false,
                  "condition": true,
                  "conditionGroup": ""
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "i18n": {}
}