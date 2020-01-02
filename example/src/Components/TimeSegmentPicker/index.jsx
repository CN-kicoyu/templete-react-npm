import React, {useState, useEffect, useCallback} from 'react'
import MutilEdit from '../MutilEdit'
import Render from './Render'

function TimeSegmentPicker(props) {
  const {format, noCross, ...rest} = props

  const handlerProps = (index) => {
    if (!noCross || !props.value) return {}
    if (index) {
      const prevList = props.value[index-1]
      return props.value[index] && ({ limitStart: prevList[1] || prevList[0] })
    }
    if (index < props.value.length - 1) {
      const nextList = props.value[index+1]
      return nextList && ({ limitEnd: nextList[0] || nextList[1] })
    }
    return {}
  }

  return (
    <MutilEdit {...rest} subValue={[]} handlerProps={handlerProps}>
      <Render format={format} onChange={props.onChange}/>
    </MutilEdit>
  )
}

export default TimeSegmentPicker
