import React from 'react'

function TemplateInput ({templete, children}) {
  const temp = [...templete, ...children]
  return (
    <div className="templete-wrap">
      {temp.map((item, key) => <React.Fragment key={key}>{item}</React.Fragment>)}
    </div>
  )
}

export default TemplateInput
