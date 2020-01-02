import React from 'react'
// import Y from 'marketsdk'
import { Field, Input, Button } from 'antd';

// class Demo extends React.Component {
//   field = new Field(this);    // 实例创建

//   onClick = ()=>{
//       console.log(this.field.getValue('name'));
//   }
//   render() {
//       const init = this.field.init;

//       // 注意：initValue只会在组件第一次初始化的时候被赋值，如果你是异步赋值请用setValue
//       return <div>
//           <Input {...init('name',{initValue:'first value'})} />
//           <button onClick={this.onClick}>获取数据</button>
//       </div>
//   }
// }

class Demo extends React.Component {
  constructor(props) {
      super(props);
      console.log(props,'999')

      this.state = {
          value: typeof props.value === 'undefined' ? [] : props.value
      };
  }

  // update value
  componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
          this.setState({
              value: typeof nextProps.value === 'undefined' ? [] : nextProps.value
          });
      }
  }

  onAdd = () => {
      const value = this.state.value.concat([]);
      value.push('new');

      this.setState({
          value
      });
      this.props.onChange(value);
  }

  render() {
      return (<div className="custom">
          {this.state.value.map((v, i) => {
              return <Button key={i} >{v}</Button>;
          })}
          <Button type="primary" onClick={this.onAdd.bind(this)}>Add ＋ </Button>
      </div>);
  }
}

export default Demo
