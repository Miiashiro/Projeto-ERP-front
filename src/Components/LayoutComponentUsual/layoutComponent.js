import React from 'react'
import SideBar from "../SideBar/sidebar"
import "./layoutComponent.css"

const layoutComponent = ({title, children}) => {
  return (
    <div className="container-prod">
            <SideBar />
            <main>
                <span>{title}</span>

                <div className="content">
                    <div className="wrap">
                        {children}
                    </div>
                </div>
            </main>
        </div>
  )
}

export default layoutComponent