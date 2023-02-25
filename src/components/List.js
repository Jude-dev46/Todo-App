import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import classes from "./List.module.css";

const List = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [todo, setTodo] = useState([]);

  async function handleShow() {
    const req = await fetch(
      "https://react-http-63a8f-default-rtdb.firebaseio.com/todo.json"
    );
    const data = await req.json();

    const prevTodos = [];

    for (const key in data) {
      prevTodos.push({
        id: data[key],
        key,
        title: data[key].enteredTitle,
        desc: data[key].enteredDescription,
        dur: data[key].enteredTime,
      });
    }

    setTodo(prevTodos);
    setShow(true);
  }

  return (
    <div className={classes.list}>
      <Button variant="primary" onClick={handleShow}>
        Get todos
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        style={{ height: "100vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Previous Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todo.map((item, index) => {
            return (
              <ul>
                <li key={index}>
                  <div>{item.title}</div>
                  <div>{item.desc}</div>
                  <div>{item.dur}</div>
                </li>
              </ul>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default List;
