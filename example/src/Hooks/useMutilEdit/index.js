import React, {useRef, useState, useCallback, useEffect} from 'react'
import { Icon, Field } from 'antd';
import { isArray, isEqual } from '../../_utils'
import './index.scss'

function useMutilEdit (reactDom = <p>This is a Demo</p>, {
  initialValue = [reactDom.props && reactDom.props.value || ''],
  maxNum = 1,
  onChange = () => {},
  subValue = isArray(initialValue[0]) ? [] : '',
  handlerProps,
  renderAddNode,
  renderDeleteNode
}) {
  console.log(JSON.stringify(initialValue), '7777777')
  if (initialValue && !isArray(initialValue)) {
    throw new Error('initialValue must be array')
  } else {
    if (initialValue.length) {
      initialValue.forEach(x => {
        if (!isEqual(x, subValue)) {
          throw new Error('The structure of subValue does not conform to initialValue')
        }
      })
    } else {
      initialValue = [reactDom.props.value || '']
    }
  }

  if (typeof subValue === 'object') {
    subValue = isArray(subValue) ? [...subValue] : {...subValue}
  }

  const counter = useRef(initialValue.length)
  const keyList= useRef(Array.from({length: initialValue.length}, (_, i) => ({
    key: i + 1,
    ref: React.createRef()
  })))
  const [value, setValue] = useState(initialValue)
  const field = Field.useField({
    parseName: true,
    values: {
      value
    },
    onChange: () => {
      const newVal = field.getValue('value')
      setValue(newVal)
      onChange(newVal)
    }
  });

  const setValueKey = useCallback(index => {
    counter.current += 1
    keyList.current.splice(index, 0, {
      key: counter.current,
      ref: ''
    })
  }, [])

  const setValueList = (newList) => {
    keyList.current = []
    setValue((prev) => {
      for(let i = prev.length - 1; i >= 0; i--) {
        field.deleteArrayValue('value', i)
      }
      newList.forEach((_, index) => {
        field.addArrayValue('value', index, _);
        setValueKey(index)
      })
      const cur = [...newList]
      onChange(cur)
      return cur
    })
  }

  const push = () => {
    if (value.length + 1 > maxNum) return
    setValue(prev => {
      const length = prev.length
      const cur = prev.concat([subValue])
      setValueKey(length)
      onChange(cur)
      field.addArrayValue('value', length, subValue);
      return cur
    })
  }

  const remove = (index) => {
    console.log('322222222')
    setValue(prev => {
      keyList.current.splice(index, 1)
      const temp = [...prev]
      temp.splice(index, 1)
      onChange(temp)
      field.deleteArrayValue('value', index)
      return temp
    })
  }

  const reset = () => setValueList(initialValue)

  const clear = () => setValueList([reactDom.props])

  console.log(value, JSON.stringify(initialValue), '7777777---')
  useEffect(() => {
    console.log(initialValue, JSON.stringify(initialValue),JSON.stringify(value), '8822222222')
    if (JSON.stringify(initialValue) !== JSON.stringify(value)) {
      setValueList(initialValue)
    }
  }, [JSON.stringify(initialValue)])

  const renderDOM = (<div>
    {value.map((item, index) => {
      console.log(item, '-====1111')
      // if (!item) return [<p>This is a Demo</p>, '']
      const {key, ref} = keyList.current[index]
      return <div className="edit-wrap" key={key}>
        {React.cloneElement(reactDom, {
          ...field.init(`value.${index}`),
          ...handlerProps && handlerProps(index)
        })}
        {value.length > 1 && (renderDeleteNode ? React.cloneElement(renderDeleteNode, {
          onClick: () => remove(index)
        }) : <Icon type="minus" className='edit-icon' onClick={() => remove(index)}/>)}
      </div>
    })}
    {value.length !== maxNum && (renderAddNode ? React.cloneElement(renderAddNode, {
          onClick: push
        }) : <p onClick={push}> + 可添加{maxNum}元素</p>)}
    </div>)

  return [renderDOM, value]
}

export default useMutilEdit
