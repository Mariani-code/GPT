// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'

// Translation component
export default function Translation({ doStuff, setInput, result }) {
  // State to store the current result
  const [currentResult, setCurrentResult] = useState("");
  // State to store the current text
  const [text, setText] = useState("");
  // State to show/hide the loader
  const [showLoader, setShowLoader] = useState(false);
  // State to store the previous result
  const [previousResult, setPreviousResult] = useState("");
  // State to store the previous text
  const [previousText, setPreviousText] = useState("");
  // State to store the history of translations
  const [history, setHistory] = useState([]);
  
  // Event handler for file input
  const handleFileInput = (e) => {
    // Create a new file reader object
    const reader = new FileReader();
    // Handle the onload event for the reader
    reader.onload = (event) => {
      // Set the input value to the result of the reader
      setInput(event.target.result);
      // Set the previous text value to the result of the reader
      setPreviousText(event.target.result);
      // Set the value of the text area to the result of the reader
      document.getElementById("text-area").value = event.target.result;
    };
    // Read the contents of the selected file as text
    reader.readAsText(e.target.files[0]);
  };
 
  // Use Effect hook to update the history when the result changes
  useEffect(() => {
    if (result) {
      // Add the previous text and result to the history array
      setHistory([{ input: previousText, output: result }, ...history]);
    }
  }, [result]);

  // State to store the selected tab index
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1);

  // Use Effect hook to animate the display of the result
  useEffect(() => {
    let i = 0;
    // Interval to update the current result and text states
    const interval = setInterval(() => {
      // Update the current result with a slice of the result string
      setCurrentResult(result && result.slice(0, i));
      // Update the text state by concatenating the next character of the result string
      setText(result ? text + result[i] : text);
      i++;
      // Clear the interval when the result string is fully displayed
      if (!result || i >= result.length) {
        clearInterval(interval);
        setShowLoader(false);
      }
    }, 10);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [result]);

// Define a constant named AARP_red with the value #FF0000, which represents a red color
const AARP_red = '#FF0000';

// Use the useState hook to set up a state for temperature with an initial value of 0.5
const [temperature, setTemperature] = useState(0.5);

// Define a function named handleTemperatureChange to update the temperature state when the temperature input value changes
const handleTemperatureChange = (event) => {
setTemperature(event.target.value);
};

// Use the useState hook to set up a state for maxLength with an initial value of 100
const [maxLength, setMaxLength] = useState(100);

// Define a function named handleMaxLengthChange to update the maxLength state when the max length input value changes
const handleMaxLengthChange = (event) => {
setMaxLength(event.target.value);
};

return (

  <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', height: '100vh', margin: 0 }}>
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
      <div style={{ position: 'absolute', top: '1em', right: '1em' }}>
        <img src={'https://1000logos.net/wp-content/uploads/2016/10/AARP-Logo.png'} style={{ height: '100px' }} />
      </div>
      <h1 style={{ marginTop: '2em', color: 'red', fontFamily: 'Luminari, fantasy' }}>GPT Demonstrator</h1>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          id="text-area"
          style={{
            width: '100%',
            height: '200px',
            fontSize: '1.5em',
            padding: '1em',
            borderRadius: '4px',
            border: '1px solid black',
            backgroundColor: 'lightgray',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.07)',
            overflowY: 'scroll',
            color: 'black',
            fontWeight: 'bold',
          }}
          onChange={(e) => {
            setInput(e.target.value);
            setPreviousText(e.target.value);
          }}
        >
          {previousText}
        </textarea>
        <input type="file" onChange={handleFileInput} />
<div style={{position: 'relative', left: '-360px', top: '-20px'}}>
<button style={{backgroundColor: AARP_red, color: 'white', fontSize: "1em"}} onClick={() => {setShowLoader(true); doStuff();}}>SUBMIT</button>
</div>
<br />
<br />
<Tabs selectedIndex={selectedTabIndex}>
<TabList>
  {history.map((item, index) => (
    <div key={index} style={{display: 'flex', alignItems: 'center'}}>
      <Tab key={index}>Session {index + 1}</Tab>
      <button style={{marginLeft: '0.5em'}} onClick={() => {setSelectedTabIndex(index);}}>View</button>
      {selectedTabIndex === index ? (
        <button style={{marginLeft: '0.5em'}} onClick={() => {setSelectedTabIndex(-1);}}>Close</button>
      ) : null}
    </div>
  ))}
</TabList>
{history.map((item, index) => (
  <TabPanel key={index}>
    <div style={{backgroundColor: "white", border: "1px solid #BFBFBF", borderRadius: "5px", padding: "0.5em", fontWeight: "bold", color: "#BFBFBF", fontSize: "1.2em", marginTop: "1em"}}>
      <p><b>Input:</b> {item.input}</p>
      <p><b>Output:</b> {item.output}</p>
    </div>
  </TabPanel>
))}
</Tabs>
<br />
<br />
<br />
<pre style={{width: "200%", height: "50em", backgroundColor: 'white', whiteSpace: "pre-wrap", fontSize: "2em", overflowY: "hidden", textAlign: "center", margin: "0 auto", marginTop: "1em", marginBottom: "2em", marginLeft: "0em", marginRight: "-25em"}}>
<p style={{color: 'black', display: showLoader ? 'block' : 'none'}}>Thinking...</p>
<div style={{display: 'flex', justifyContent: 'center'}}>
  {showLoader ? <BarLoader color="red"/> : null}
</div>
{text.slice(0, text.length - currentResult.length)}
<mark style={{backgroundColor: '#39FF14'}}>{currentResult}</mark>
</pre>
      </div>
    </div>
    <div style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: 'column', width: '40%', height: '1vh', alignItems: "center", padding: "2em" }}>
<h3 style={{ fontWeight: "bold", marginBottom: "1em", display: 'flex', alignItems: 'center' }}>
  Model
  <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '0.5em' }} />
  <Tooltip place="top" type="light" effect="solid" text="Select the language model to use for the translation." />
</h3>
<select style={{ width: '100%', padding: '1em', borderRadius: '4px', border: '1px solid #BBBBBB', backgroundColor: '#F2F2F2', fontWeight: "bold", marginBottom: "1.5em", color: '#000000' }}>
  <option value="gpt2">GPT-3</option>
  <option value="davinci">Davinci</option>
  <option value="curie">Curie</option>
  <option value="babbage">Babbage</option>
</select>
<h3 style={{ fontWeight: "bold", marginBottom: "1em", display: 'flex', alignItems: 'center' }}>
  Temperature
  <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '0.5em' }}
    data-tip="Select the language model to use for the translation." />
  <Tooltip />
</h3>
<input type="range" min="0" max="1" step="0.01" value={temperature} style={{ width: "100%", height: "2em", marginBottom: "1.5em", background: "#ff9a9e" }} onChange={handleTemperatureChange} />
<h3 style={{ fontWeight: "bold", marginBottom: "1em", display: 'flex', alignItems: 'center' }}>
  Maximum Length
  <FontAwesomeIcon icon={faInfoCircle} style={{ marginLeft: '0.5em' }}
    data-tip="Select the language model to use for the translation." />
  <Tooltip />
</h3>
<input type="number" min="1" value={maxLength} style={{ width: "100%", padding: "0.5em", borderRadius: '4px', border: '1px solid #BBBBBB', backgroundColor: '#FFFFFF', fontWeight: "bold", color: '#000000'  }} onChange={handleMaxLengthChange} />
</div>
<Tooltip background="#333" />
  </div>
);
}
