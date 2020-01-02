## MutilEdit

#### 使用方式一：HOC

```js
// 普通使用
<MutilEdit>
  <Demo hha="dd" className="iiii"/>
</MutilEdit>

// 引入 field
<MutilEdit
  {...init('test', {
    initValue: [['111'], ['222']],
    props:{
      onChange:(v)=>{
        console.log(v)
      }
    }
  })}
  subValue={['000']}
  maxNum={4}
  renderAddNode={<h1>hhha</h1>}
>
  <Demo hha="dd" className="iiii"/>
</MutilEdit>
```

#### 使用方式二：HOOK

```js
function Test (props) {
  const [renderDOM, list] = useMutilEdit(
    <Demo hha="dd" className="iiii"/>,
    {
      maxNum: 4,
      subValue: ['000'],
      initialValue: [['1111', '2222']],
      onChange: (x) => {props.onChange(x)}
    }
  )

  return <div>{renderDOM}</div>
}
```

#### Api

- renderDOM: 需要新增的组件
- options
  - maxNum: 最大新增数量
  - initialValue: 初始值
  - subValue: 新增item的数据结构
  - handlerProps: 传递不同的props参数给renderDOM
  - onChange: 数据变化监听
  - renderAddNode: 自定义新增按钮的DOM结构
  - renderDeleteNode: 自定义删除按钮的DOM结构

#### 返回数据

- renderDOM: 可渲染的 ReactElement
- list: 数据数组
