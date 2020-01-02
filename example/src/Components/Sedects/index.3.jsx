import React, {useState, useCallback, useEffect, useRef} from 'react'
import { Radio, Tag, Checkbox } from 'antd';

// 完整版本
const {Group: TagGroup, Selectable: SelectableTag} = Tag;

const isArray = x => Object.prototype.toString.call(x) === '[object Array]'
const findSub = (x, y) => x.filter(z => z.value === y && z.subList)[0]

const SelectTag = ({dataSource, value = [], onChange = () => {}}) => {
  const handleChange = (name, checked) => {
    const next = checked ? [...value, name] : value.filter(n => n !== name);
    console.log(next, '------333')
    onChange(next);
  }
  return <TagGroup>
    {dataSource.map((name, i) => (
      <SelectableTag key={name.label}
        checked={value.indexOf(name.value) > -1}
        onChange={(x) => handleChange(name.value, x)}
        size="small">
        {name.label}
      </SelectableTag>
    ))}
  </TagGroup>
}

const compRender = (type) => {
  switch(type) {
    case 'radio':
      return Radio.Group
    case 'tag':
      return SelectTag
    case 'checkbox':
      return Checkbox.Group
    default:
      throw new Error('Should be set type')
  }
}

function WeekComponent ({dataSource: {type, list, name}, value, onChange = () => {}, prefix}) {
  // if (value && Object.prototype.toString.call(value) !== '[object Array]') {
  //   throw new Error('initValue must be array')
  // }

  const [check, setCheck] = useState(value[name])
  const [subList, setSubList] = useState([])
  const Comp = compRender(type)

  useEffect(() => {
    console.log(check, '=--111')
    let hasList = []
    if (isArray(check)) {
      check.forEach(x => {
        const isFind = findSub(list, x)
        if (isFind) {
          prefix.add(`${name}$-$${x}$-$${isFind.subList.name}`)
          hasList.push(isFind)
        }
      })
    } else {
      const isFind = findSub(list, check)
      if (isFind) {
        prefix.add(`${name}$-$${check}$-$${isFind.subList.name}`)
        hasList = [isFind]
      }
    }
    setSubList(hasList)
  }, [check])

  return (
    <article>
      <Comp dataSource={list} value={check} onChange={(x, y, z) => {
        console.log(name, x, prefix, '======')
        onChange(name, x)
        setCheck(x)
      }}/>
      {check && subList.map((item, index) => {
        return item && (
          <section style={{marginTop: 10}}>
            <WeekComponent dataSource={item.subList} key={item.label} value={value} onChange={onChange} prefix={prefix}/>
          </section>
        ) || ''
      })}
    </article>
  )
}

function WeekPicker ({dataSource, value={}, onChange = () => {}}) {
  const ref = useRef(value)
  const prefix = useRef(new Set())

  const handleChange = (name, value) => {
    let arr = Array.from(prefix.current)
    const relyPath = (name) => arr.forEach(x => {
      const temp = x.split('$-$')
      if (temp[0] === name && ![...value].includes(temp[1])) {
        console.log(x, name, '---111')
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
