import React, { useState, useEffect } from "react"
import './progressbar01.scss'

export default function Progressbar01(){
  const [filled, setFilled] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if(filled < 100 && isRunning){
      setTimeout(() => setFilled(prev => prev += 2), 50)
    }
  }, [filled, isRunning])

  return(
    <div className="container-progressbar1">
      <div className="progressbar">
        <div style={{height: '100%', width: `${filled}%`, backgroundColor: '#a66cff', transition: 'width 0.5s'}}></div>
        <span className="progressbarPercent">{filled}%</span>
      </div>
      <button className="btn" onClick={() => setIsRunning(true)}>Run</button>
    </div>
  )
}