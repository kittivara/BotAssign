import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Bot, TypeResult } from './bot';



const App = () => {
  const ref = useRef(null)
  const [result, setResult] = useState<TypeResult | undefined>(undefined)
  const bot = new Bot()

  const printBot = () => {
    const element = ref.current as any
    const inputValue = element.value
    const result = bot.printBot(inputValue)
    setResult(result);
  }

  return (
    <div>
      <input ref={ref} type="text" id="command" name="command" placeholder='enter input' />
      <button onClick={() => printBot()}>Submit</button>
      {result && <div>
        <p>X: {result.axisX}</p>
        <p>Y: {result.axisY}</p>
        <p>Compass: {result.lastFacing}</p>
      </div>}
    </div>
  );
}

export default App;
