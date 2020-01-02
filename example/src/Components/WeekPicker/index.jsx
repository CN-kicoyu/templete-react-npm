import React, {useRef} from 'react'
import WeekComponent from './WeekComponent'
import { isObject } from '../../_utils'

function WeekPicker ({dataSource, value={}, onChange = () => {}}) {
  if (value && !isObject) {
    throw new Error('initValue must be object')
  }

  const ref = useRef(value)
  const prefix = useRef(new Set())

  const handleChange = (name, value) => {
    let arr = Array.from(prefix.current)
    const relyPath = (name) => arr.forEach(x => {
      const temp = x.split('$-$')
      if (temp[0] === name && ![...value].includes(temp[1])) {
        relyPath(temp[2])
        delete ref.current[temp[2]]
      }
    })
    relyPath(name)
    ref.current[name] = value
    onChange(ref.current)
  }

  return <WeekComponent dataSource={dataSource} value={ref.current} onChange={handleChange} prefix={prefix.current}/>
}

export default WeekPicker
