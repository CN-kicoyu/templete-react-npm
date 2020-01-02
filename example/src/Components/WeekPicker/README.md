## WeekPicker

#### 使用方式

```js
// 普通使用
const dataSource = {
    type: 'radio',
    name: 'test1',
    list: [
      {
          value: '整周',
          label: '整周',
          subList: {
            type: 'tag',
            name: 'test2',
            list: [
              {
                value: '星期一',
                label: '星期一',
              },
              {
                value: '星期二',
                label: '星期二',
              },
              {
                value: '星期三',
                label: '星期三'
              },
              {
                value: '星期四',
                label: '星期四'
              },
              {
                value: '星期五',
                label: '星期五'
              },
              {
                value: '星期六',
                label: '星期六'
              },
              {
                value: '星期天',
                label: '星期天'
              }
            ]
          }
      }, {
          value: '周一到周五',
          label: '周一到周五'
      }, {
          value: '周末',
          label: '周末'
      }
  ]
}
<WeekPicker dataSource={dataSource} />

// 引入 field
<WeekPicker dataSource={dataSource} {...init('test2', {
    initValue: {
      test1: '整周',
      test2: ['星期二'],
    },
    props:{
      onChange:(v)=>{
        console.log(v, '999')
      }
    }
})}/>

// 无限嵌套其他条件选项
const dataSource = {
    type: 'radio',
    name: 'test1',
    list: [
      {
          value: '整周',
          label: '整周',
          subList: {
            type: 'tag',
            name: 'test2',
            list: [
              {
                value: '星期一',
                label: '星期一',
                subList: {
                  type: 'checkbox',
                  name: 'test3',
                  list: [
                    {
                      value: 'XXXX',
                      label: 'XXXX'
                    },
                    {
                      value: 'YYYY',
                      label: 'YYYY',
                      subList: {
                        type: 'radio',
                        name: 'test4',
                        list: [
                          {
                            value: '33',
                            label: '33'
                          },
                          {
                            value: '22',
                            label: '22'
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                value: '星期二',
                label: '星期二',
                subList: {
                  type: 'radio',
                  name: 'test5',
                  list: [
                    {
                      value: 'qq',
                      label: 'qq'
                    },
                    {
                      value: 'ww',
                      label: 'ww'
                    }
                  ]
                }
              },
              {
                value: '星期三',
                label: '星期三'
              },
              {
                value: '星期四',
                label: '星期四'
              },
              {
                value: '星期五',
                label: '星期五'
              },
              {
                value: '星期六',
                label: '星期六'
              },
              {
                value: '星期天',
                label: '星期天'
              }
            ]
          }
      }, {
          value: '周一到周五',
          label: '周一到周五'
      }, {
          value: '周末',
          label: '周末'
      }
  ]
}
<WeekPicker dataSource={dataSource} {...init('hhha', {
    initValue: {
      test1: '整周',
      test2: ['星期二'],
      test5: 'qq'
    },
    props:{
      onChange:(v)=>{
        console.log(v, 'yyyyy')
      }
    }
})}/>
```

#### dataSource Api

```js
type DateType = 'radio' | 'tag' | 'checkbox'
type Item = string | number

Interface IDataSource {
  type: DateType;
  name: string,
  list: Array<{value: Item, label: Item, subList: IDataSource}>
}
```

#### initValue Api

注意 tag 和 checkbox 的类型需要使用数组形式

#### 接收数据

- dataSource
- value
- onChange
