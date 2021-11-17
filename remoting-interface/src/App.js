import logo from './logo.svg';
import './App.css';
import PencilTool from './components/penciltool';
import React, { Component, FC, useState } from 'react';
import { Input } from 'semantic-ui-react';
import { Form, TextArea, Button } from 'semantic-ui-react'
import { ResizableBox } from 'react-resizable';
import ResizePanel from "react-resize-panel";
import { Rnd } from 'react-rnd';
import DraggableList from "react-draggable-lists";
import Slider from '@mui/material/Slider';


const listItems = [
  "Entertainment",
  "Private Time",
  "Rest",
  "Meal",
  "Exercise",
  "Work",
  "Home Projects",
  "Family"
];

function App() {
  const Box = () => (
    <div
      className="box"
      style={{ margin: 0, height: '100%', paddingBottom: '40px' }}
    >
      
    </div>
  );

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className="textBox">
        {/* <Input type="text" placeholder="Enter Text Here" style={{width: "370px"}}/> */}
        <Form>
          <TextArea placeholder="Enter Text Here"></TextArea>
        </Form>
      </div>
      <div className="buttons">
        <div className="button1">
          <Button>#1</Button>
        </div>
        <div className="button2">
          <Button>#2</Button>
        </div>
        <div className="button3">
          <Button>#3</Button>
        </div>
        <div className="button4">
          <Button>#4</Button>
        </div>
        <div className="button5">
          <Button>#5</Button>
        </div>
        {/* <div className="resizableBox">
          <ResizePanel direction='s' style={{backgroundColor: 'black', height: '50%'}}>
            <div style={{backgroundColor: 'blue', height: '100%'}}>panel</div>
          </ResizePanel>
        </div>
        <div class="wrap">
          <div class="resize both">Resize me!</div>
        </div> */}
        <div 
        style={{
          width: '800px',
          height: '400px',
        }}
      >
        <Rnd className="moveBox"
          
        >
          <Box />
        </Rnd>
      </div>  
      <div style={{ width: 300, margin: "0 auto" }}>
        <DraggableList width={300} height={50} rowSize={1}>
                {listItems.map((item, index) => (
                  <li key={index}>{`${index + 1}.  ${item}`}</li>
                ))}
            </DraggableList>
      </div>
      <div>
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
      </div>
      <div className="whiteboard">
        <PencilTool />
      </div>
      </div>
    </div>
  );
}



export default App;
