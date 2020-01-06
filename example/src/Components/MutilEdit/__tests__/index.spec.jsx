import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon'
import { Table, TimePicker, Field, Input,Icon } from 'antd';

import MutilEdit from '../';
import Demo from '../../../demo'

describe('MutilEdit', () => {
  it('init render', () => {
    const wrapper = shallow(<MutilEdit />)
    expect(wrapper.containsMatchingElement(<p>This is a Demo</p>)).toEqual(true)
  })
  describe('actions', () => {
    let wrapper
    let testState = [['111'], ['222']];
    const onButtonClick = sinon.spy()
    beforeEach(() => {
      wrapper = mount(<MutilEdit maxNum={3} value={testState} subValue={[]} onChange={(v) => {testState = v;console.log('222222', JSON.stringify(v))}}><Demo /></MutilEdit>)
    })
    it('render Demo component', () => {
      expect(wrapper.containsMatchingElement(<Demo />)).toEqual(true);
    })
    it('change Demo data', () => {
      wrapper.find('.next-btn-primary').at(0).simulate('click')
      expect(testState).toEqual([['111', 'new'], ['222']])
    })
    it('change MutilEdit props data', () => {
      wrapper.setProps({ value: [['3333'], ['44444']] })
      expect(testState).toEqual([['3333'], ['44444']])
    })
    it('remove a row', () => {
      wrapper.find(Icon).at(0).simulate('click')
      // expect(testState).toEqual([['3333'], ['44444']])
    })
  })
})
