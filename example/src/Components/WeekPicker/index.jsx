import React, {useState, useRef, useEffect} from 'react'
import WeekComponent from './WeekComponent'
import { isObject } from '../../_utils'

function WeekPicker ({dataSource = {
  type: 'radio',
  name: 'demo',
  list: [{
    value: 'demo',
    label: 'demo'
  }]
}, value={}, onChange = () => {}}) {
  if (value && !isObject) {
    throw new Error('initValue must be object')
  }

  const [val, setVal] = useState(value)
  const prefix = useRef(new Set())

  const handleChange = (name, value) => {
    const oldVal = {...val}
    let arr = Array.from(prefix.current)
    const relyPath = (name) => arr.forEach(x => {
      const temp = x.split('$-$')
      if (temp[0] === name && (!value || ![...value].includes(temp[1]))) {
        relyPath(temp[2])
        delete oldVal[temp[2]]
      }
    })
    relyPath(name)
    oldVal[name] = value
    setVal({...oldVal})
    onChange(oldVal)
  }

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(val)) {
      setVal({...value})
    }
  }, [JSON.stringify(value)])

  return <WeekComponent dataSource={dataSource} value={val} onChange={handleChange} prefix={prefix.current}/>
}

export default WeekPicker
