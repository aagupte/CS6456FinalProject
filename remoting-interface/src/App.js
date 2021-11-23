import logo from './logo.svg';
import './App.css';
import PencilTool from './components/penciltool';
import React, { Component, FC, useEffect, useState } from 'react';
import { Input } from 'semantic-ui-react';
import { Form as SemForm } from 'semantic-ui-react'
import { TextArea, Button } from 'semantic-ui-react';
import { ResizableBox } from 'react-resizable';
import ResizePanel from "react-resize-panel";
import { Rnd } from 'react-rnd';
import DraggableList from "react-draggable-lists";
import Slider from '@mui/material/Slider';
import Gun from 'gun'
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import "./App.css";
import { Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}


// Gun
const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})
// Gun



// const listItems = [
//   "Class Projects",
//   "Homework",
//   "Presentation",
//   "Coding Project",
//   "Studying",
//   "Final Assignment",
//   "Home Projects",
//   "Personal"
// ];

function App() {
  // setTimeout()
  const [todos, setTodos] = React.useState([
    {
      text: "Final Presentation",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    todo.put({list: newTodos});
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    todo.put({list: newTodos});
    setTodos(newTodos);
  };

  const Box = () => (
    <div
      className="box"
      style={{ margin: 0, height: '100%', paddingBottom: '40px' }}
    >
      
    </div>
  );

  const tb1 = gun.get("textbox1")
  const buttons = gun.get("buttons")
  const vol = gun.get("volume")
  const lis = gun.get("list")
  const todo = gun.get("todo")

  

  // Gun
  const [textValue, setTextValue] = React.useState("Enter Text Here");
  const [clicked, setClicked] = React.useState({button1: false, button2: false, button3: false, button4: false, button5: false});
  const [value, setValue] = React.useState(30);
  const [list, setList] = React.useState([
    "Class Projects",
    "Homework",
    "Presentation",
    "Coding Project",
    "Studying",
    "Final Assignment",
    "Home Projects",
    "Personal"
  ]);

  const textChange = (event, newValue) => {
    setTextValue(event.target.value.toString());
    tb1.put({name: event.target.value.toString()})
  };

  const update = () => {
    vol.once((data) => {
      if(data == undefined)
        setValue(value);
      else
        setValue(data.volume);
    })

    todo.once((data) => {
      if(data == undefined)
        setTodos(todos);
      else
        setTodos(data.list);
    })
    

    tb1.once((data) => {
      // console.log("3")
      // console.log(data.name)
      setTextValue(data.name)
    })

    buttons.once((data) => {
      var flag1 = false;
      var flag2 = false;
      var flag3 = false;
      var flag4 = false;
      var flag5 = false;
  
      if(data == undefined) {
        setClicked(clicked);
      } else {
          if(data.button1 == null)
            data.button1 = flag1;
          if(data.button2 == null)
            data.button2 = flag2;
          if(data.button3 == null)
            data.button3 = flag3; 
          if(data.button4 == null)
            data.button4 = flag4;
          if(data.button5 == null)
            data.button5 = flag5;
  
          setClicked( {button1: data.button1, button2: data.button2, button3: data.button3, button4: data.button4, button5: data.button5} )
      }
  
      
    })

    lis.once((data) => {
      if(data == undefined)
        setList(list);
      else 
        setList(data.list);
    })
  };

  const syncButton = (id) => {
    var selected = buttons.get("button" + id);
    var button_state = clicked['button' + id];
    if(button_state == true) {
      selected.put(false);
    } else {
      selected.put(true);
    }
    setClicked({...clicked, ['button' + id]: !clicked['button' + id]});
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    vol.put({volume: newValue});
  };

  const draggedChange = (event, newList) => {
    setList(newList);
    list.put({list: newList});
  };

  // const buttonClicked = (event) => {
  //   setClicked(event.)
  // }

  useEffect(() => {
    setInterval(function(){ update(); }, 2000);
    

  }, [])

  

  

  

  

  // useEffect(() => {
  //   console.log("3" + tb1.get('name').value)
  //   setTextValue(tb1.get('name').value)
  // }, [])
  
  // Gun

  return (
    <div className="App">
      <header className = "App-header">Remote Interface Test Environment</header>
      <div className="textBox">
        <SemForm>
          <TextArea value = {textValue} onInput = {textChange} placeholder="Enter Text Here"></TextArea>
        </SemForm>
      </div>
        <div className="row2">
          <div className="buttons">
            <div className="button1">
              <Button className="1" active={clicked.button1} onClick = {() => syncButton(1)}>#1</Button>
            </div>
            <div className="button2">
              <Button className="2" active={clicked.button2} onClick = {() => syncButton(2)}>#2</Button>
            </div>
            <div className="button3">
              <Button className="3" active={clicked.button3} onClick = {() => syncButton(3)}>#3</Button>
            </div>
            <div className="button4">
              <Button className="4" active={clicked.button4} onClick = {() => syncButton(4)}>#4</Button>
            </div>
            <div className="button5">
              <Button className="5" active={clicked.button5} onClick = {() => syncButton(5)}>#5</Button>
            </div>

              
        </div>
      <div className = "list" style={{ width: 300, margin: "0 auto" }}>
            {/* <DraggableList value={list} onChange={draggedChange} width={300} height={50} rowSize={1}>
                    {list.map((item, index) => (
                      <li key={index}>{`${index + 1}.  ${item}`}</li>
                    ))}
                </DraggableList> */}

            <h1 className="text-center mb-4">Todo List</h1>
                    <FormTodo addTodo={addTodo} />
                    <div>
                      {todos.map((todo, index) => (
                        <Card>
                          <Card.Body>
                            <Todo
                            key={index}
                            index={index}
                            todo={todo}
                            markTodo={markTodo}
                            removeTodo={removeTodo}
                            />
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
          </div>
      
      
      
      <div>
        {/* <Slider aria-label="Volume" value={value} onChange={handleChange} /> */}
        <Slider aria-level="Volume" value={value} onChange={handleChange}></Slider>
      </div>
      <div>
        <Rnd className="moveBox">
          <Box />
        </Rnd>
          </div>
      <div className="whiteboard">
        <PencilTool />
      </div>
      </div>
    </div>
  );
}



export default App;
