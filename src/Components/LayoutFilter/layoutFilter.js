import React from 'react'
import "./layoutFilter.css"

const layoutFilter = (props) => {
  return (
    <div className='resumeItem'>
        <div>{props.children}</div>
    </div>
  )
}

export default layoutFilter