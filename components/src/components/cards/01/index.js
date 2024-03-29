import React from "react";
import './card01.css'

export default function Card01(){
  const cards = [
    {
      name: "summary",
      total: 21,
      description: "Due Tasks",
      footer: "Completed: 13"
    },
    {
      name: "projects",
      total: 15,
      description: "Active Projects",
      footer: "Completed: 7"
    }
  ];

  return(
    <div className="cards">
      {cards.map((card) => (
        <label key={card.name} id={card.name}>
          <input type="checkbox"/>
          <div className="card">
            <div className="front">
              <header>
                <h2>{card.name}</h2>
                <span>more_vert</span>
              </header>
              <var>{card.total}</var>
              <h3>{card.description}</h3>
              <h4>{card.footer}</h4>
            </div>
            <div className="back">
              <header>
                <h2>{card.name}</h2>
                <span>Close</span>
              </header>
              <p>More Information</p>
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}