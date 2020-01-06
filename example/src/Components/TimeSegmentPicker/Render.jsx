import React, { useState, useEffect } from 'react'
import { TimePicker } from 'antd';
import moment from 'moment'

import './index.scss'

const NAME_MAP = {
  'ss': 'second',
  'mm': 'minute',
  'HH': 'hour'
}

const getTimeList = (format) => (time = '') => {
  const temp = {}
  time && format.split(':').forEach((item, index) => {
    temp[NAME_MAP[item]] = time.split(':')[index]
  })
  return temp
}
const formatMoment = (x, y) => moment(x, y, true).add(1, 's').format(y)
const getFormatVal = (val, format) => !val || typeof val === 'string'  ? val : val.format(format)

const Render = ({format="HH:mm:ss", onChange, value, limitStart, limitEnd}) => {
  const [times, setTimes] = useState(value || [])
  const getList = getTimeList(format)

  const checkDisabled = {
    second: !format.includes('ss'),
    minute: !format.includes('mm'),
    hour: !format.includes('HH'),
  }

  const disabledItem = (orientation, name) => (index) => {
    const isLeft = orientation === 'left'
    if ((isLeft && times[1] && !limitStart && !limitEnd) || (!isLeft && !times[0] && !limitEnd)) return false

    const leftList = getList(times[0])
    const rightList = getList(times[1])
    const limitStartList = getList(limitStart)
    const limitEndList = getList(limitEnd)
    const res = isLeft ? (rightList[name] && index > Number(rightList[name])) || (limitStartList[name] && index < Number(limitStartList[name])) || (limitEndList[name] && index > Number(limitEndList[name]))  : (leftList[name] && index < Number(leftList[name])) || (limitEndList[name] && index > Number(limitEndList[name]))

    switch(name) {
      case 'hour':
        return res
      case 'minute':
        return (rightList.hour && rightList.hour === leftList.hour || (limitStartList.hour && limitStartList.hour === leftList.hour) || (limitEndList.hour && limitEndList.hour === leftList.hour) || (limitEndList.hour && limitEndList.hour === rightList.hour)) ? res : false
      case 'second':
        return (rightList.hour && rightList.hour === leftList.hour && rightList.minute && rightList.minute === leftList.minute) || (limitStartList.hour && limitStartList.hour === leftList.hour && limitStartList.minute && limitStartList.minute === leftList.minute) || (limitEndList.hour && limitEndList.hour === rightList.hour && limitEndList.minute && limitEndList.minute === rightList.minute)|| (limitEndList.hour && limitEndList.hour === leftList.hour && limitEndList.minute && limitEndList.minute === leftList.minute) ? res : false
      default:
        throw new Error('Only can use hour / minute / second')
    }
  }

  useEffect(() => {
    if (times[1] <= times[0]) {
      setTimes(prev => {
        const temp = [...prev]
        temp[1] = formatMoment(temp[0], format);
        return temp
      })
    }
    if (limitStart && times[0] < limitStart) {
      setTimes(prev => {
        const temp = [...prev]
        temp[0] = formatMoment(limitStart, format);
        return temp
      })
    }
    onChange(times)
  }, [times[0], times[1]])

  return <div className="timesegment-wrap">
    <span className="timesegment-left">222222</span>
    <div className="timesegment-right">
      <TimePicker
        disabledHours={disabledItem('left', 'hour')}
        disabledMinutes={disabledItem('left', 'minute')}
        disabledSeconds={disabledItem('left', 'second')}
        format={format}
        value={times[0]}
        onChange={(val) => setTimes(prev => [getFormatVal(val, format), prev[1]])} />
      <span className="divider"> - </span>
      <TimePicker
        disabledHours={disabledItem('right', 'hour')}
        disabledMinutes={disabledItem('right', 'minute')}
        disabledSeconds={disabledItem('right', 'second')}
        format={format}
        value={times[1]}
        onChange={(val) => setTimes(prev => [prev[0], getFormatVal(val, format)])}/>
    </div>
  </div>
}

export default Render
