import { useState, useRef } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import TodoList from "./components/TodoList";
import { Button, Container, Modal, Navbar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [show, setShow] = useState(true);
  const nameRef = useRef();
  const [userName, setUserName] = useState("");

  // Getting the username
  const handleClose = () => {
    const name = nameRef.current.value;
    setUserName(name);
    setShow(false);

    if (userName === "") {
      setShow(true);
    }
  };

  // Adding new todos
  async function addTodoHandler(inputs) {
    setTodoList((prevTodoList) => {
      return [
        ...prevTodoList,
        {
          title: inputs.enteredTitle,
          description: inputs.enteredDescription,
          duration: inputs.enteredTime,
          inputs,
          id: Math.random().toString(),
        },
      ];
    });

    // Sending todos to the database
    const response = await fetch(
      `https://react-http-63a8f-default-rtdb.firebaseio.com/${userName}.json`,
      {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    console.log(data);
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Enter your name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter your first name"
            className="input"
            ref={nameRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Navbar>
          <Container className="header">
            <Header />
            <List name={userName} />
          </Container>
        </Navbar>
        <div>
          <Input onAddTodo={addTodoHandler} />
          <TodoList todos={todoList} onAddTodo={addTodoHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
