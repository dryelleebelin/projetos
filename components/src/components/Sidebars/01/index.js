import React, { useState } from "react";
import './sidebar01.css'

import { PiCodesandboxLogoBold } from "react-icons/pi";
import { IoMdHome, IoMdSettings, IoMdBuild } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";

export default function Sidebar01(){
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { name: "home", icon: <IoMdHome/>},
    { name: "settings", icon: <IoMdSettings/>},
    { name: "build", icon: <IoMdBuild/>}
  ]

  return(
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="inner">
        <header>
          <button type="button" className="sidebar-burger" onClick={() => setIsOpen(!isOpen)}>
            <span className="icon">{isOpen ? <IoClose/> : <IoMenu/>}</span>
          </button>
          <p className="img"><PiCodesandboxLogoBold/> Sidebar</p>
        </header>
        <nav>
          {navItems.map((item, index) => (
            <button type="button" key={index}>
              <span className="icon">{item.icon}</span>
              <p>{item.name}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}