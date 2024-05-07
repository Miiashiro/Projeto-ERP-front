import React, { useState } from 'react'
import { FaBox, FaHome, FaTruck } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "./sidebar.css"

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const menuItem = [
        {
            path: "/Home",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/Produto",
            name: "Produto",
            icon: <FaBox />
        },
        {
            path: "/Fornecedor",
            name: "Fornecedor",
            icon: <FaTruck />
        }
    ]

    return (
        <div className='container-side'>
            <nav className={isOpen === true ? 'has-val sidebar' : 'sidebar'}>
                <input type="checkbox" className="menu-faketrigger" onClick={toggle} />

                <div className="menu-lines">
                    <span />
                    <span />
                    <span />
                </div>

                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link-bar">
                            <div className='icon'>{item.icon}</div>
                            <div className={isOpen === false ? 'has-low nameBar' : 'nameBar'}>{item.name}</div>
                        </NavLink>
                    ))
                }
            </nav>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar