import React, { useState, useCallback, useEffect } from 'react'
import { Radio, Tag, Checkbox } from 'antd';
import { isArray, findSub, getType } from '../../_utils'

const {Group: TagGroup, Selectable: SelectableTag} = Tag;
const VAL_TYPE = {
  'radio': ['string', 'number'],
  'tag': ['array'],
  'checkbox': ['array']
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
const SelectTag = ({dataSource, value = [], onChange = () => {}}) => {
  const handleChange = (name, checked) => {
    const next = checked ? [...value, name] : value.filter(n => n !== name);
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

function WeekComponent ({dataSource: {type, list, name}, value, onChange = () => {}, prefix}) {
  if (!type || !name || !list) {
    throw new Error('dataSource must be an "{type: radio | tag | checkbox, list: Array<{value: any, label: any}>, name: string}" structure')
  }
  if (value[name] && !VAL_TYPE[type].includes(getType(value[name]))) {
    throw new Error('initValue should be have right structure')
  }

  const [check, setCheck] = useState(value[name])
  const [subList, setSubList] = useState([])
  const Comp = compRender(type)

  useEffect(() => {
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
      <Comp dataSource={list} value={check} onChange={x => {
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

export default WeekComponent
