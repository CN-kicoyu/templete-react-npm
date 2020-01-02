## TimeSegmentPicker

#### 使用方式

```js
// 普通使用
<TimeSegmentPicker maxNum={3} format="HH:mm:ss" />

// 引入 field
<TimeSegmentPicker maxNum={3} format="HH:mm:ss" {...init('tttt', {
  initValue: [
    ['02:32:28', '03:22:32'],
    ["08:32:21", "23:32:12"]
  ],
  props:{
    onChange:(v)=>{
      console.log(v, 'ooooo')
    }
  }
})}/>

// 设置是否允许跨区设置时间段
<TimeSegmentPicker maxNum={3} format="HH:mm:ss" noCross={true} {...init('tttt', {
    initValue: [
      ['02:32:28', '03:22:32'],
      ["08:32:21", "23:32:12"]
    ],
    props:{
      onChange:(v)=>{
        console.log(v, 'ooooo')
      }
    }
})}/>
```
