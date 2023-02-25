import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Card from "./UI/Card";

const TodoList = ({ todos }) => {
  const [todo, setTodo] = useState(todos);

  useEffect(() => {
    setTodo(todos);
  }, [todos]);

  const removeTodoHandler = (id) => {
    const removeItem = todo.filter((todo) => {
      return todo.id !== id;
    });
    setTodo(removeItem);

    // const index = todo.findIndex((todo) => todo.id !== id);
    // if (index !== -1) {
    //   const updatedTodo = [...todo];
    //   updatedTodo.splice(index, 1);
    //   setTodo(updatedTodo);
    // }
  };

  const todoList = todo.map((todo) => (
    <ListItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      description={todo.description}
      duration={todo.duration}
      onRemove={removeTodoHandler}
    />
  ));

  return (
    <Card>
      <ul>{todoList}</ul>
    </Card>
  );
};

export default TodoList;
