import React from 'react'
import useMutilEdit from '../../Hooks/useMutilEdit'

function MutilEdit ({
  maxNum,
  subValue,
  value,
  onChange,
  handlerProps,
  renderAddNode,
  renderDeleteNode,
  children
}) {
  const [renderDOm, list] = useMutilEdit(children, {
    maxNum,
    subValue,
    initialValue: value,
    onChange: (x) => onChange && onChange(x),
    handlerProps,
    renderAddNode,
    renderDeleteNode
  })

  return renderDOm
}

export {
  useMutilEdit
}

export default MutilEdit
