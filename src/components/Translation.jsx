import React, { useState, useEffect } from "react";

export default function Translation({ doStuff, setInput, result }) {
  const [currentResult, setCurrentResult] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentResult(result && result.slice(0, i));
      setText(result ? text + result[i] : text);
      i++;
      if (!result || i >= result.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [result]);

  const AARP_blue = '#FF0000';
  const AARP_yellow = '#FFFFFF';

  return (
    <div style={{ backgroundColor: 'white', display: "flex", flexDirection: 'column', alignItems: "center", height: '100vh', margin: 0 }}>
      <img src={'https://1000logos.net/wp-content/uploads/2016/10/AARP-Logo.png'} style={{height: '100px', marginTop: '2em'}} />
      <div style={{ width: "100%", maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          style={{ width: "100%", height: "10em", fontSize: "1.5em" }}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <br />
        <button style={{ width: "100%", backgroundColor: AARP_blue, color: 'white', fontSize: "1.5em" }} onClick={doStuff}>
          SUBMIT
        </button>
        <br />
        <br />
        <pre style={{ width: "100%", height: "10em", backgroundColor: AARP_yellow, whiteSpace: "pre-wrap", fontSize: "1.5em" }}>
          {result ? text.slice(0, text.length - currentResult.length) : ''}
          <mark style={{ backgroundColor: '#39FF14' }}>{result ? currentResult : ''}</mark>
        </pre>
      </div>
    </div>
  );
}
