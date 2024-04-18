import React from 'react'
import './layoutComponent.css'

const LayoutComponent = (props) => {
  return (
    <div className="container-form">
      <div className="wrap-form">
        <div className="form">
          <span className="title-start">{props.title}</span>

          {props.children}
        </div>
      </div>
    </div>
  )
}

export default LayoutComponent