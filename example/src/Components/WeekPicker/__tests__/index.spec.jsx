import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon'
import { Table, TimePicker, Field, Input,Icon } from 'antd';

import WeekComponent from '../';

describe('MutilEdit', () => {
  it('init render', () => {
    const wrapper = shallow(<WeekComponent />)
    expect(wrapper.prop('dataSource')).toMatchObject({
      type: 'radio',
      name: 'demo',
      list: [{
        value: 'demo',
        label: 'demo'
      }]
    })
  })
  it('render component', () => {
    let testState = {
      test1: '整周',
      test2: ['星期二'],
      test5: 'qq'
    }
    const wrapper = mount(<WeekComponent dataSource={{
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
  }} value={testState} onChange={(v) => testState = v}/>)
    expect(wrapper.find('section').length).toEqual(2);
    wrapper.setProps({ value: {test1: '整周',
    test2: ['星期一']}})
    expect(testState).toEqual({test1: '整周',
    test2: ['星期一']})
  })
})
