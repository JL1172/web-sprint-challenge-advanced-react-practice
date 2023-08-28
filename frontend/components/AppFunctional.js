import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
// Suggested initial states
const initialMessage = "";
const initialEmail = 'jacob@gmail.com'
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


async function fetchData(aMessage) {
  const res = await axios.post("http://localhost:9000/api/result", aMessage);
  try {
    return res;
  } catch {
    console.error("This Did Not Work");
  }
}


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index1, setIndex1] = useState(initialIndex);
  const [array, setArray] = useState([0, 1, 2, 3, 4, 5,6, 7, 8]);
  const [coords, setCoords] = useState("2,2");


  const coordTemplate = [
    [1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3]
  ];

  function getXY(i) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let [x,y] = coordTemplate[index1];
    setCoords(`${x},${y}`);
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setCoords("2,2");
    setIndex1(initialIndex);
    setSteps(initialSteps);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "RIGHT") {
      return index1 + 1;
    }
    if (direction === "LEFT") {
      return index1 - 1;
    }
    if (direction === "UP") {
      return index1 - 3;
    } 
    if (direction === "DOWN") {
      return index1 + 3;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getXY(index1);
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinate : ({coords})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0,1,2,3,4,5,6,7,8].map((idx) => (
            <div key={idx} className={`square${idx === index1 ? ' active' : ''}`}>
              {idx === index1 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}




// if (evt.target.textContent === "LEFT") {
//   let xy = coordTemplate.at(index1);
//   let [a,b] = xy;
//   if (a >= xy[0] &&  b > 0) {
//     b -= 1;
//     setIndex1(()=> index1 - 1)
//     setCoords(`${a},${b}`)
//     setSteps(()=> steps + 1);
//   } else {
//     setMessage("You can't go left")
//   }
