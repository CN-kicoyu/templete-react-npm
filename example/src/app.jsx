import React from 'react'
// import Y from 'marketsdk'
import { Table, TimePicker, Field, Input } from 'antd';
import useTable from './Hooks/useTable'
import useMutilEdit from './Hooks/useMutilEdit'
import MutilEdit from './Components/MutilEdit/index'
import Demo from './demo'
import Text from './Text'
import 'antd/dist/next.css';
import './app.scss'
import WeekPicker from './Components/WeekPicker'
import TimeSegmentPicker from './Components/TimeSegmentPicker'
import CouponPreview from './Components/CouponPreview'
import TemplateInput from './Components/TemplateInput'

const data = () => {
  const result = []
  for (let i = 0; i < 5; i++) {
    result.push({
      title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
      id: 100306660940 + i,
      time: 2000 + i
    })
  }
  return result
}

function App() {
  const field = Field.useField({
    onChange: (x) => console.log(x)
  });
  const { init, setValue, reset, getError } = field;
  const [{ dataSource }, setValue2] = useTable(data())
  // const [Hha, value] = useMutilEdit(<Demo hha="dd" className="iiii"/>, {maxNum:4, initialValue: [1,3], onChange: (x) => {
  //   // console.log(x, 'yyyyyy')
  // }})
  const render = (value, index, record) => {
    return <a href="javascript:;" onClick={() => setValue2([{
      title: { name: '23232323' },
      id: 3232,
      time: 3233
    }])}>Remove({record.id})</a>
  }
  return (<div>
    <p style={{margin: '50px 0'}}>-----------DEMO----------------</p>
    <Table dataSource={dataSource}>
      <Table.Column title="Id" dataIndex="id" />
      <Table.Column title="Title" dataIndex="title.name" />
      <Table.Column title="Time" dataIndex="time"/>
      <Table.Column cell={render} />
    </Table>
    <p style={{margin: '50px 0'}}>------------DEMO---------------</p>
    <div style={{width: 400}}>
      <MutilEdit {...init('test', {
                  initValue: [['111'], ['222']],
                  props:{
                    onChange:(v)=>{
                      console.log(v, '999yyyyy')
                    }
                  }
              })} subValue={['000']} maxNum={4} renderAddNode={<h1>hhha</h1>}>
        <Demo hha="dd" className="iiii"/>
      </MutilEdit>
    </div>
    <p style={{margin: '50px 0'}}>--------------DEMO-------------</p>
    {/* <WeekPicker dataSource={[
        {
            value: '整周',
            label: '整周',
            checkedList: [
              {
                value: '星期一',
                label: '星期一',
                checkedList: [
                  {
                    value: 'XXXX',
                    label: 'XXXX'
                  },
                  {
                    value: 'YYYY',
                    label: 'YYYY'
                  }
                ]
              },
              {
                value: '星期二',
                label: '星期二'
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
        }, {
            value: '周一到周五',
            label: '周一到周五'
        }, {
            value: '周末',
            label: '周末'
        }
    ]} {...init('test2', {
      initValue: ['整周', [['星期一', ['YYYY']], '星期二', '星期三']],
      props:{
        onChange:(v)=>{
          console.log(v, '999yyyyy')
        }
      }
  })}/> */}
    <WeekPicker dataSource={{
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
    }} {...init('hhha', {
      initValue: {
        test1: '整周',
        test2: ['星期二'],
        test5: 'qq'
      },
      props:{
        onChange:(v)=>{
          console.log(v, '999yyyyy')
        }
      }
  })}/>
    <p style={{margin: '50px 0'}}>--------------DEMO-------------</p>
    <div style={{width: 900}}>
      <TimeSegmentPicker maxNum={3} format="HH:mm:ss" noCross={true} {...init('tttt', {
      // initValue: [
      //   ['02:32:28', '03:22:32'],
      //   ["08:32:21", "23:32:12"]
      // ],
      props:{
        onChange:(v)=>{
          console.log(v, 'ooooo')
        }
      }
  })}/>
      <TimeSegmentPicker/>
    </div>
    <p style={{margin: '50px 0'}}>--------------DEMO-------------</p>
    <CouponPreview name="车厘子商品红包" price="3" priceDesc="满0元使用" nameDesc="领取7天后有效，每人每天限领一张" />
    <p style={{margin: '50px 0'}}>--------------DEMO-------------</p>
    <TemplateInput templete={[
      <span style={{marginRight: 20}}>3333</span>,
      <Input />,
      '3333333'
    ]}>
      <Input />
      111111
    </TemplateInput>
    </div>
  )
}

export default App
