

import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";


export default function Translation({ doStuff, setInput, result }) {
  const [currentResult, setCurrentResult] = useState("");
  const [text, setText] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleFileInput = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target.result);
      document.getElementById("text-area").value = event.target.result;
    };
    reader.readAsText(e.target.files[0]);
  };



  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentResult(result && result.slice(0, i));
      setText(result ? text + result[i] : text);
      i++;
      if (!result || i >= result.length) {
        clearInterval(interval);
        setShowLoader(false);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [result]);




  const AARP_red = '#FF0000';
  const AARP_white = '#FFFFFF';


  return (
    
    <div style={{ backgroundColor: 'white', display:"flex", flexDirection: 'column', alignItems: "center", height: '100vh', margin: 0 }}>
    <div style={{ position: 'absolute', top: '1em', right: '1em' }}>
      <img src={'https://1000logos.net/wp-content/uploads/2016/10/AARP-Logo.png'} style={{ height: '100px' }} />
    </div>
    <h1 style={{marginTop: '2em', color: 'red', fontFamily: 'Luminari, fantasy'}}>AARP GPT-3</h1>
    <div style={{ width: "100%", maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <textarea
  id="text-area"
  style={{ width: "200%", height: "auto", fontSize: "1.5em", padding: "1em", borderRadius: "4px", border: "1px solid black", backgroundColor: "#C0C0C0", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.07)" }}
  onChange={(e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }}
></textarea>
<input type="file" onChange={handleFileInput} />
      <br />
      <div style={{ position: 'absolute', bottom: '4em', left: '-50em', right: '47em' }}>
          <button style={{ backgroundColor: AARP_red, color: 'white', fontSize: "1em",  }} onClick={() => {
            setShowLoader(true);
            doStuff();
          }}>
            SUBMIT
          </button>
        </div>
        <br />
        <br />
        <pre style={{ width: "100%", height: "10em", backgroundColor: AARP_white, whiteSpace: "pre-wrap", fontSize: "1.5em"}}>
        <p style={{ color: 'black', display: showLoader ? 'block' : 'none' }}>Thinking...</p>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        {showLoader ? <BarLoader color="red" /> : null}
          </div>
          {result ? text.slice(0, text.length - currentResult.length) : ''}
          <mark style={{ backgroundColor: '#39FF14' }}>{result ? currentResult : ''}</mark>
        </pre>
      </div>
    </div>
  );

}

