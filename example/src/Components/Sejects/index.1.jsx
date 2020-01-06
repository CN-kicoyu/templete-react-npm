import React, {useState, useEffect} from 'react'
import { TimePicker } from 'antd';
import MutilEdit from '../MutilEdit'
import moment from 'moment'

import './index.scss'

const NAME_MAP = {
  'ss': 'second',
  'mm': 'minute',
  'HH': 'hour'
}
const formatFunc = time => moment(time, 'HH:mm:ss', true);
const getTimeList = (format, time = '') => {
  const temp = {}
  format.split(':').forEach((item, index) => {
    temp[NAME_MAP[item]] = time.split(':')[index]
  })
  return temp
}

const Render = ({format, onChange, value, noCross}) => {
  const [times, setTimes] = useState(value || [])

  const checkDisabled = {
    second: !format.includes('ss'),
    minute: !format.includes('mm'),
    hour: !format.includes('HH'),
  }

  const disabledItem = (orientation, name) => (index) => {
    const isLeft = orientation === 'left'
    if (!times[isLeft ? 1 : 0]) return false
    const leftList = getTimeList(format, times[0])
    const rightList = getTimeList(format, times[1])
    const res = isLeft ? rightList[name] && index > Number(rightList[name]) : leftList[name] && index < Number(leftList[name])
    switch(name) {
      case 'hour':
        return res
      case 'minute':
        return rightList.hour && rightList.hour === leftList.hour ? res : false
      case 'second':
        return rightList.hour && rightList.hour === leftList.hour && rightList.minute && rightList.minute === leftList.minute ? res : false
      default:
        throw new Error('Only can use hour / minute / second')
    }
  }

  useEffect(() => {
    onChange(times)
  }, [times[0], times[1]])

  return <div className="timesegment-wrap">
    <span className="timesegment-left">22222222</span>
    <div className="timesegment-right">
      <TimePicker
        disabledHours={disabledItem('left', 'hour')}
        disabledMinutes={disabledItem('left', 'minute')}
        disabledSeconds={disabledItem('left', 'second')}
        format={format}
        value={times[0]}
        onChange={(val) => setTimes(prev => [typeof val === 'string' ? val : val.format(format), prev[1]])} />
      <span className="divider"> - </span>
      <TimePicker
        disabledHours={disabledItem('right', 'hour')}
        disabledMinutes={disabledItem('right', 'minute')}
        disabledSeconds={disabledItem('right', 'second')}
        format={format}
        value={times[1]}
        onChange={(val) => setTimes(prev => [prev[0], typeof val === 'string' ? val : val.format(format)])}/>
    </div>
  </div>
}

const formatList = (list) => list.map(item => item ? item.join('-') : '').join('-')

function TimeSegmentPicker(props) {
  const {format, noCross, value, ...rest} = props
  const [list, setList] = useState(value || [])
  console.log(formatList(list))

  useEffect(() => {}, [
    formatList(list)
  ])


  return (
    <MutilEdit {...rest} subValue={[]} value={list}>
      <Render format={format} onChange={props.onChange}/>
    </MutilEdit>
  )
}

export default TimeSegmentPicker
