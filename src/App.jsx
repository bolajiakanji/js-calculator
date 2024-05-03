import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [displaystate, setDisplaystate] = useState("");
  const [result, setResult] = useState("");
  const [isAllowed, setIsAllowed] = useState("true");

  useEffect(() => {
    let buttonNumbers = document.querySelectorAll(".button_number");
    let button;
    for (button = 0; button < buttonNumbers.length; button++) {
      buttonNumbers[button].addEventListener("click", you);
    }

    return () => {
      for (button = 0; button < buttonNumbers.length; button++) {
        buttonNumbers[button].removeEventListener("click", you);
      }
    };
  });

  useEffect(() => {
    let signs = document.querySelectorAll(".sign");
    let sign;
    for (sign = 0; sign < signs.length; sign++) {
      signs[sign].addEventListener("click", me);
    }

    return () => {
      for (sign = 0; sign < signs.length; sign++) {
        signs[sign].removeEventListener("click", me);
      }
    };
  },[isAllowed]);
  
  

  function you(e) {
    if (displaystate === "0") {
      setDisplaystate("" + e.target.innerText);
    } else {
      console.log("loop");
      setDisplaystate(displaystate + e.target.innerText);
    }
    
  }
  function tokenize(s) {
    // --- Parse a calculation string into an array of numbers and operators
    const r = [];
    let token = "";
    for (const character of s) {
      if ("^*/+-".includes(character)) {
        if (token === "" && character === "-") {
          token = "-";
        } else {
          r.push(parseFloat(token), character);
          token = "";
        }
      } else {
        token += character;
      }
    }
    if (token !== "") {
      r.push(parseFloat(token));
    }
    console.log(r);
    return r;
  }

  function calculate(tokens) {
    // --- Perform a calculation expressed as an array of operators and numbers
    const operatorPrecedence = [
      { "^": (a, b) => Math.pow(a, b) },
      { "*": (a, b) => a * b, "/": (a, b) => a / b },
      { "+": (a, b) => a + b, "-": (a, b) => a - b },
    ];
    let operator;
    for (const operators of operatorPrecedence) {
      const newTokens = [];
      for (const token of tokens) {
        if (token in operators) {
          operator = operators[token];
        } else if (operator) {
          newTokens[newTokens.length - 1] = operator(
            newTokens[newTokens.length - 1],
            token
          );
          operator = null;
        } else {
          newTokens.push(token);
        }
      }
      tokens = newTokens;
    }
    if (tokens.length > 1) {
      console.log("Error: unable to resolve calculation");
      return tokens;
    } else {
      return tokens[0];
    }
  }
  function equal() {
    let display = document.getElementById("display").innerText;
    console.log(display);
    setResult(calculate(tokenize(display)));
    setDisplaystate(calculate(tokenize(display)));
  }

  function clear() {
    setDisplaystate("0");
  }

  function decimal() {
    if (isAllowed) {
      setDisplaystate(displaystate + ".");
      setIsAllowed(false)
    }
  }
  function me(e) {
    if (displaystate === "0") {
      setDisplaystate("" + e.target.innerText);
    } else {
      console.log("loop");
      setDisplaystate(displaystate + e.target.innerText);
    }
    setIsAllowed(true)
  }

  return (
    <div id="container">
      <div id="display">{displaystate}</div>
      <div id="result">{result}</div>
      <div id="clear" onClick={clear}>
        AC
      </div>
      <div className="button_number sign" id="divide">
        /
      </div>
      <div className="button_number sign" id="multiply">
        *
      </div>

      <div className="button_number" id="seven">
        7
      </div>
      <div className="button_number" id="eight">
        8
      </div>
      <div className="button_number" id="nine">
        9
      </div>
      <div className="button_number sign" id="subtract">
        -
      </div>

      <div className="button_number" id="four">
        4
      </div>
      <div className="button_number" id="five">
        5
      </div>
      <div className="button_number" id="six">
        6
      </div>
      <div className="button_number sign" id="add">
        +
      </div>

      <div className="button_number" id="one">
        1
      </div>
      <div className="button_number" id="two">
        2
      </div>
      <div className="button_number" id="three">
        3
      </div>
      <div className="" id="equals" onClick={equal}>
        =
      </div>
      <div className="button_number" id="zero">
        0
      </div>
      <div id="decimal" onClick={decimal}>
        .
      </div>
      <div className="button_number">^</div>
    </div>
  );
}

export default App;
