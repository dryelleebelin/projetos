import React from "react";
import { Link } from "react-router-dom";

export default function App(){
  return(
    <div className="app">
      <h1>components</h1>
      <main>
        <button><Link to={`/sidebar/01`}>sidebar</Link></button>
        <button><Link to={`/button/darkmode`}>darkmode</Link></button>
        <button><Link to={`/button/download`}>download</Link></button>
        <button><Link to={`/card/01`}>cards</Link></button>
      </main>
    </div>
  );
}