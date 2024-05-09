import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [displaystate, setDisplaystate] = useState("0");
  const [result, setResult] = useState("");
  const [isAllowed, setIsAllowed] = useState("true");

  // useEffect(() => {
  //   let buttonNumbers = document.querySelectorAll(".button_number");
  //   let button;
  //   for (button = 0; button < buttonNumbers.length; button++) {
  //     buttonNumbers[button].addEventListener("click", you);
  //   }

  //   return () => {
  //     for (button = 0; button < buttonNumbers.length; button++) {
  //       buttonNumbers[button].removeEventListener("click", you);
  //     }
  //   };
  // });

  // useEffect(() => {
  //   let signs = document.querySelectorAll(".sign");
  //   let sign;
  //   for (sign = 0; sign < signs.length; sign++) {
  //     signs[sign].addEventListener("click", me);
  //   }

  //   return () => {
  //     for (sign = 0; sign < signs.length; sign++) {
  //       signs[sign].removeEventListener("click", me);
  //     }
  //   };
  // });

  function you(e) {
    if (displaystate === "0") {
      setDisplaystate("" + e.target.innerText);
    } else if(/0/.test(displaystate.charAt(displaystate.length-1)) && /[-+*/]/.test(displaystate.charAt(displaystate.length-2))){
    setDisplaystate((displaystate)=> {let arr= displaystate.slice()
    let _arr  =arr.split('');
 _arr[_arr.length-1] = e.target.innerText
return _arr.join('')})
    }  else {
      
      setDisplaystate(displaystate + e.target.innerText);
    }
    console.log(e.target.innerText)
    console.log(displaystate)
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
    // let display = document.getElementById("display").innerText;
    // console.log(display);
    // setResult(calculate(tokenize(display)));
    // setDisplaystate(calculate(tokenize(display)).toString());
    // setIsAllowed(true)
    // console.log(calculate(tokenize(display)).toString())
    console.log(displaystate)
    let come=eval(displaystate)
    setDisplaystate(come.toString())
    console.log("result" + come)
    setIsAllowed(true)
  }

  function clear() {
    setDisplaystate("0");
    setIsAllowed(true)
    console.log("restart")
    
  }

  function decimal() {
    
      if(!"-+/*".includes(displaystate.slice(-1)) ){
          if(isAllowed){
      
      setDisplaystate(displaystate + ".");
      setIsAllowed(false);
    }}
    console.log('decimal')
  }
  function me(e) {
    if (displaystate.length === 1 && (displaystate ==="0" || displaystate === "-")){
      
        
      
    }else if ("-+/*".includes(displaystate.charAt(displaystate.length-2)) && displaystate.charAt(displaystate.length-1)==="-"){
      setDisplaystate((displaystate)=> {let arr= displaystate.slice()
        let _arr  =arr.split('');
     _arr[_arr.length-2] = e.target.innerText
     _arr[_arr.length-1]=""
     setIsAllowed(true);
     
    return _arr.join('')})
    }
   else if ("+/*-.".includes(displaystate.charAt(displaystate.length-1))){
      setDisplaystate((displaystate)=> {let arr= displaystate.slice()
        let _arr  =arr.split('');
     _arr[_arr.length-1] = e.target.innerText
     setIsAllowed(true);
     
    return _arr.join('')})
      

    
    } 
    
    else {
      
      setDisplaystate(displaystate + e.target.innerText);
    }
    setIsAllowed(true);
    console.log(e.target.innerText)
  }
  function minus(e) {
    if (displaystate.length === 1 && (displaystate ==="0" || displaystate === "-")){
  
        setDisplaystate('-')
      
    }

   else if ("+-/*".includes(displaystate.charAt(displaystate.length-2)) && displaystate.charAt(displaystate.length-1)==="-"){
      setDisplaystate((displaystate)=> {let arr= displaystate.slice()
        let _arr  =arr.split('');
     _arr[_arr.length-1] = e.target.innerText
     
     
    return _arr.join('')})
      

    
    } else {
      
      setDisplaystate(displaystate + e.target.innerText);
    }
    setIsAllowed(true);
    console.log("-")
  }
  
  function zero() {
let _zero = document.getElementById("zero")

if(displaystate==="0"){
  setDisplaystate("0")
} else if(/0/.test(displaystate.charAt(displaystate.length-1)) && /[-+*/]/.test(displaystate.charAt(displaystate.length-2))){

} else {
  
  

setDisplaystate(displaystate + "0")
}
console.log('0')}

  return (
    <div  id="container">
      <div id="display">{displaystate}</div>
      <div  id="result">{result}</div>
      <div id="clear" onClick={clear}>
        AC
      </div>
      <div  className="sign" id="divide" onClick={me}>
        /
      </div>
      <div  className="sign" id="multiply"onClick={me}>
        *
      </div>

      <div  className="button_number" id="seven" onClick={you}>
        7
      </div>
      <div onClick={you} className="button_number" id="eight">
        8
      </div>
      <div onClick={you} className="button_number" id="nine">
        9
      </div>
      <div   id="subtract" onClick={(e)=>minus(e)}>
        -
      </div>

      <div onClick={you} className="button_number" id="four">
        4
      </div>
      <div onClick={you} className="button_number" id="five">
        5
      </div>
      <div onClick={you} className="button_number" id="six">
        6
      </div>
      <div onClick={me} className="sign" id="add">
        +
      </div>

      <div onClick={you} className="button_number" id="one">
        1
      </div>
      <div onClick={you} className="button_number" id="two">
        2
      </div>
      <div onClick={you} className="button_number" id="three">
        3
      </div>
      <div className="" id="equals" onClick={equal}>
        =
      </div>
      <div id="zero" onClick={zero}>
        0
      </div>
      <div  id="decimal" onClick={decimal}>
        .
      </div>
      <br />
      <div onClick={you} className="button_number">^</div>
    </div>
  );
}

export default App;
