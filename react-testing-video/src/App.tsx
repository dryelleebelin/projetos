import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [message, setMessage] = useState("Let's learn more about testing in React")  //mensagem inicial

  return (
    <div>
      <h1>Hello world!</h1>
      <p>{message}</p>
      {/* <button style={{backgroundColor: 'red', color:'white', padding: 10}} onClick={() => setMessage('New message!')}>Change message</button> */}
      <Button disabled={false} onClick={() => setMessage("New message!")}>
        Change message
      </Button>
    </div>
  );
}

export default App;
