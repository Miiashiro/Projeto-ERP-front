import React from 'react'
import './layoutComponent.css'

const LayoutComponent = (props) => {
  return (
    <div className="container-form">
      <div className="wrap-form">
        <div className="form">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default LayoutComponent