import React from "react"
import './skeleton.scss'

export default function Skeleton(){
  return(
    <div className="skeleton">
      <div className="profile">
        <div className="avatar skeleton-box"></div>
        <div className="name skeleton-box"></div>
      </div>
    </div>
  )
}