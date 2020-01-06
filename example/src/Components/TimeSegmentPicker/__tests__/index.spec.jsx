import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon'
import { Table, TimePicker, Field, Input,Icon } from 'antd';

import TimeSegmentPicker from '../';

describe('MutilEdit', () => {
  it('init render', () => {
    const wrapper = shallow(<TimeSegmentPicker />)
    expect(wrapper.props().subValue).toEqual([])
  })
  describe('actions', () => {
    let wrapper
    let testState = [
      ['02:32:28', '03:22:32'],
      ["08:32:21", "23:32:12"]
    ]
    const onButtonClick = sinon.spy()
    beforeEach(() => {
      wrapper = mount(<TimeSegmentPicker maxNum={3} value={testState} subValue={[]} onChange={(v) => {testState = v}} />)
    })
    it('render component', () => {
      expect(wrapper.find('.edit-wrap').length).toEqual(testState.length);
    })
    it('change data', () => {
      wrapper.setProps({ value: [
        ['01:32:28', '03:22:32']
      ]})
      expect(testState).toEqual([
        ['01:32:28', '03:22:32']
      ])
    })
    it('add data', () => {
      wrapper.find('p').at(0).simulate('click')
      expect(wrapper.find('.edit-wrap').length).toEqual(2);
      wrapper.find('p').at(0).simulate('click')
      expect(wrapper.find('p').exists()).toEqual(false)
    })
    it('remove data', () => {
      wrapper.find('i.edit-icon').at(0).simulate('click')
      expect(wrapper.find('.edit-wrap').length).toEqual(2);
      wrapper.find('i.edit-icon').at(0).simulate('click')
      expect(wrapper.find('.edit-wrap').length).toEqual(1);
      expect(wrapper.find('i.edit-icon').exists()).toEqual(false);
    })
  })
})
