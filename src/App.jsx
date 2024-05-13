import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [displaystate, setDisplaystate] = useState("0");
  const [resultStore, setResultStore] = useState("0");
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
  });

  function you(e) {
    if (displaystate === "LIMIT EXCEEDED") {
    } else if (displaystate.length === 20) {
      setDisplaystate("LIMIT EXCEEDED");
      setTimeout(() => {
        setDisplaystate("0");
        setResultStore("0");
      }, 1000);
    } else if (displaystate === "0") {
      setDisplaystate("" + e.target.innerText);
      setResultStore("" + e.target.innerText);
    } else if (
      /0/.test(displaystate.charAt(displaystate.length - 1)) &&
      /[-+x/]/.test(displaystate.charAt(displaystate.length - 2))
    ) {
      setDisplaystate((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;
        return _arr.join("");
      });
      setResultStore((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;
        return _arr.join("");
      });
    } else {
      setDisplaystate(displaystate + e.target.innerText);
      setResultStore(displaystate + e.target.innerText);
    }
  }
  function tokenize(s) {
    let changeTokens = s.replace(/x/g, "*");

    // --- Parse a calculation string into an array of numbers and operators
    const r = [];
    let token = "";
    for (const character of changeTokens) {
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
      {
        "*": (a, b) => (a * 10000 * b * 10000) / 100000000,
        "/": (a, b) => (a * 10000) / (b * 10000),
      },
      {
        "+": (a, b) => (a * 10000 + b * 10000) / 10000,
        "-": (a, b) => (a * 10000 - b * 10000) / 10000,
      },
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
    let res = displaystate;
    let display = document.getElementById("display").innerText;
    let cal_result = calculate(tokenize(display)).toString()
    if (cal_result.includes(".")) {
      setIsAllowed(false)

    }else {
    setIsAllowed(true)
    }

    setResultStore(res + " = " + calculate(tokenize(display)).toString());
    setDisplaystate(calculate(tokenize(display)).toString());
    
    console.log(calculate(tokenize(display)).toString());
    console.log(displaystate);

    
  }

  function clear() {
    setDisplaystate("0");
    setResultStore("0");
    setIsAllowed(true);
  }

  function back() {
    if ("+-x/.".includes(displaystate.length - 1)) [setIsAllowed(true)];
  }

  function decimal() {
    if (displaystate === "LIMIT EXCEEDED") {
    } else if (displaystate.length === 20) {
      setDisplaystate("LIMIT EXCEEDED");
      setTimeout(() => {
        setDisplaystate("0");
      }, 1000);
    } else if (!"-+/x".includes(displaystate.slice(-1))) {
      if (isAllowed) {
        setDisplaystate(displaystate + ".");
        setResultStore(displaystate + ".");
        setIsAllowed(false);
      }
    }
    console.log("decimal");
  }
  function me(e) {
    if (displaystate === "LIMIT EXCEEDED") {
    } else if (displaystate.length === 20) {
      setDisplaystate("LIMIT EXCEEDED");
      setTimeout(() => {
        setDisplaystate("0");
      }, 1000);
    } else if (
      displaystate.length === 1 &&
      (displaystate === "0" || displaystate === "-")
    ) {
    } else if (
      "-+/x".includes(displaystate.charAt(displaystate.length - 2)) &&
      displaystate.charAt(displaystate.length - 1) === "-"
    ) {
      setDisplaystate((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 2] = e.target.innerText;
        _arr[_arr.length - 1] = "";
        setIsAllowed(true);

        return _arr.join("");
      });
      setResultStore((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 2] = e.target.innerText;
        _arr[_arr.length - 1] = "";
        setIsAllowed(true);

        return _arr.join("");
      });
    } else if ("+/x-.".includes(displaystate.charAt(displaystate.length - 1))) {
      setDisplaystate((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;
        setIsAllowed(true);

        return _arr.join("");
      });
      setResultStore((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;
        setIsAllowed(true);

        return _arr.join("");
      });
    } else {
      setDisplaystate(displaystate + e.target.innerText);
      setResultStore(displaystate + e.target.innerText);
    }
    setIsAllowed(true);
    console.log(e.target.innerText);
  }
  function minus(e) {
    if (displaystate === "LIMIT EXCEEDED") {
    } else if (displaystate.length === 20) {
      setDisplaystate("LIMIT EXCEEDED");
      setTimeout(() => {
        setDisplaystate("0");
        setResultStore("0");
      }, 1000);
    } else if (
      displaystate.length === 1 &&
      (displaystate === "0" || displaystate === "-")
    ) {
      setDisplaystate("-");
    } else if (
      "+-/x".includes(displaystate.charAt(displaystate.length - 2)) &&
      displaystate.charAt(displaystate.length - 1) === "-"
    ) {
      setDisplaystate((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;

        return _arr.join("");
      });
      setResultStore((displaystate) => {
        let arr = displaystate.slice();
        let _arr = arr.split("");
        _arr[_arr.length - 1] = e.target.innerText;

        return _arr.join("");
      });
    } else {
      setDisplaystate(displaystate + e.target.innerText);
      setResultStore(displaystate + e.target.innerText);
    }
    setIsAllowed(true);
    console.log("-");
  }

  function zero() {
    let _zero = document.getElementById("zero");
    if (displaystate === "LIMIT EXCEEDED") {
    } else if (displaystate.length === 20) {
      setDisplaystate("LIMIT EXCEEDED");
      setTimeout(() => {
        setDisplaystate("0");
        setResultStore("0");
      }, 1000);
    } else if (displaystate === "0") {
      setDisplaystate("0");
      setResultStore("0");
    } else if (
      /0/.test(displaystate.charAt(displaystate.length - 1)) &&
      /[-+x/]/.test(displaystate.charAt(displaystate.length - 2))
    ) {
    } else {
      setDisplaystate(displaystate + "0");
      setResultStore(displaystate + "0");
    }
    console.log("0");
  }
  function back() {
    if (displaystate.length === 1) {
      setDisplaystate("0");
      setResultStore("0");
      setIsAllowed(true);
    } else {
      if ("+-/x".includes(displaystate.slice(-1))) {
        let str = displaystate.slice(0, -1);
        let arr = [];
        arr.push(str.lastIndexOf("-"));
        arr.push(str.lastIndexOf("+"));
        arr.push(str.lastIndexOf("/"));
        arr.push(str.lastIndexOf("x"));

        let sort = arr.sort(function (a, b) {
          return b - a;
        });
        let highest = sort[0];
        if (str.includes(".", highest)) {
          setIsAllowed(false);
        }
      } else if (displaystate.slice(-1) === ".") {
        setIsAllowed(true);
      }

      setDisplaystate(displaystate.slice(0, -1));
      setResultStore(displaystate.slice(0, -1));
    }
  }

  return (
    <div id="container">
      <div id="display-box">
        <div id="result-store" style={{ color: "orange" }}>
          {resultStore}
        </div>
        <div id="display">{displaystate}</div>
      </div>
      <div className="btn-box">
        <button id="clear" onClick={clear}>
          AC
        </button>
        <button id="back" className="btn" onClick={back}>
          Back
        </button>
        <button className="btn sign" id="divide">
          /
        </button>

        <button className="btn button_number" id="seven">
          7
        </button>
        <button className="btn button_number" id="eight">
          8
        </button>

        <button className="btn button_number" id="nine">
          9
        </button>
        <button className="btn sign" id="multiply">
          x
        </button>

        <button className="btn button_number" id="four">
          4
        </button>
        <button className="btn button_number" id="five">
          5
        </button>
        <button className="btn button_number" id="six">
          6
        </button>
        <button id="subtract" className="btn" onClick={minus}>
          -
        </button>

        <button className="btn button_number" id="one">
          1
        </button>
        <button className="btn button_number" id="two">
          2
        </button>
        <button className="btn button_number" id="three">
          3
        </button>
        <button className="btn sign" id="add">
          +
        </button>

        <button id="zero" className="btn" onClick={zero}>
          0
        </button>

        <button id="decimal" className="btn" onClick={decimal}>
          .
        </button>
        <button className="btn" id="equals" onClick={equal}>
          =
        </button>

        <br />
      </div>
    </div>
  );
}

export default App;
