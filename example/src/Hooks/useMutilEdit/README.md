## useMutilEdit

#### 使用方式

```js
function Demo (props) {
  const [renderDOM, list] = useMutilEdit(<Text hha="dd"/>, {
    maxNum: 4,
    subValue: ['000'],
    initialValue: [['1111', '2222']],
    onChange: (x) => {props.onChange(x)},
    renderAddNode: <h1>Add</h1>,
    renderDeleteNode: <Icon style="delete">delete</Icon>
  })

  return <div>{renderDOM}</div>
}
```

#### Api

- maxNum: 最大新增数量
- initialValue: 初始值
- subValue: 新增item的数据结构
- onChange: 数据变化监听
- handlerProps: 传递不同的props参数给renderDOM
- renderAddNode: 自定义新增按钮的DOM结构
- renderDeleteNode: 自定义删除按钮的DOM结构

#### 返回数据

- renderDOM: 可渲染的 ReactElement
- list: 数据数组
