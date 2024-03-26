import React from "react";
import { Link } from "react-router-dom";

export default function App(){
  return(
    <div className="app">
      <h1>components</h1>
      <main>
        <button><Link to={`/sidebar/01`}>sidebar</Link></button>
      </main>
    </div>
  );
}