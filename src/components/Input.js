import React, { useRef, useState, useEffect } from "react";

import Card from "./UI/Card";
import ringtone from "../file/ringtone.mp3";
import classes from "./Input.module.css";

const Input = (props) => {
  let [reminder, setReminder] = useState("");
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const durationInputRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(ringtone);

  const addTodoHandler = (e) => {
    e.preventDefault();

    const inputs = {
      enteredTitle: titleInputRef.current.value,
      enteredDescription: descInputRef.current.value,
      enteredTime: durationInputRef.current.value,
    };

    // Checking validation
    if (
      inputs.enteredTitle === "" ||
      inputs.enteredDescription === "" ||
      inputs.enteredTime === ""
    ) {
      titleInputRef.current.value = "";
      descInputRef.current.value = "";
      durationInputRef.current.value = "";
    } else {
      props.onAddTodo(inputs);
    }

    // Clearing inputs
    titleInputRef.current.value = "";
    descInputRef.current.value = "";
    durationInputRef.current.value = "";

    setReminder(inputs.enteredTime);

    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const d = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      const timeString = d
        .toLocaleTimeString("en-GB", options)
        .replace(" AM", "")
        .replace(" PM", "");

      if (timeString === reminder) {
        setIsPlaying(true);
        audio.play();
      } else {
        setIsPlaying(false);
        audio.pause();
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [reminder]);

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.title}>
          <label htmlFor="task title">Task Title:</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            ref={titleInputRef}
          />
        </div>
        <div className={classes.desc}>
          <label htmlFor="task description">Decription:</label>
          <input
            type="text"
            placeholder="Description"
            id="description"
            ref={descInputRef}
          />
        </div>
        <div className={classes.duration}>
          <label htmlFor="task duration">Time:</label>
          <input type="time" id="time" ref={durationInputRef} />
        </div>
        <button onClick={addTodoHandler} className={classes.button}>
          Add Todo
        </button>
      </form>
    </Card>
  );
};

export default Input;
