import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar } from "react-bootstrap";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

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
    const response = await fetch(
      "https://react-http-63a8f-default-rtdb.firebaseio.com/todo.json",
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
      <div>
        <Navbar>
          <Container className="header">
            <Header />
            <List />
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
