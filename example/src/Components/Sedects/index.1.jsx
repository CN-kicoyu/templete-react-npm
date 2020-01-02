import React, {useState, useCallback, useEffect} from 'react'
import { Radio, Tag } from 'antd';

const {Group: TagGroup, Selectable: SelectableTag} = Tag;

// 固定格式
function WeekPicker ({dataSource, value = ['', []], onChange=() => {}}) {
  console.log(value, '=====')
  if (value && Object.prototype.toString.call(value) !== '[object Array]') {
    throw new Error('initValue must be array')
  }

  const [type, setType] = useState(value[0])
  const [checkedList, setCheckedList] = useState([])
  const [day, setDay] = useState(value[1])

  const handleChange = (name, checked) => {
    const next = checked ? [...day, name] : day.filter(n => n !== name);
    setDay(next);
    onChange([type, next])
  }

  useEffect(() => {
    const list = dataSource.filter(x => x.value === type && x.checkedList)[0]
    if (list) {
      setCheckedList(list ? list.checkedList : [])
      setDay((prev) => !!prev.length ? prev : list.checkedList.map(x => x.value));
    } else {
      setCheckedList([])
    }
    onChange([type])
  }, [type])

  return (
    <article>
      <Radio.Group
        dataSource={dataSource}
        value={type}
        onChange={(x) => setType(x)}
      />
      {!!type && !!checkedList.length && (
        <section style={{marginTop: 10}}>
          <TagGroup>
            {checkedList.map((name, i) => (
              <SelectableTag key={name.label}
                checked={day.indexOf(name.value) > -1}
                onChange={(x) => handleChange(name.value, x)}
                size="small">
                {name.label}
              </SelectableTag>
            ))}
          </TagGroup>
        </section>
      )}
    </article>
  )
}

export default WeekPicker
