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
        <button><Link to={`/lista/draganddrop`}>drag and drop</Link></button>
        <button><Link to={`/page/calculator`}>calculator</Link></button>
        <button><Link to={`/page/citacoes`}>citações</Link></button>
        <button><Link to={`/notifications/01`}>notificações</Link></button>
        <button><Link to={`/progressbar/01`}>progressbar</Link></button>
        <button><Link to={`/progressbar/02`}>progressbar</Link></button>
        <button><Link to={`/progressbar/stepper`}>stepper</Link></button>
        <button><Link to={`/footer/01`}>footer</Link></button>
        <button><Link to={`/footer/02`}>footer</Link></button>
        <button><Link to={`/card/02`}>card</Link></button>
        <button><Link to={`/footer/03`}>footer</Link></button>
        <button><Link to={`/loading/skeleton`}>skeleton</Link></button>
      </main>
    </div>
  );
}