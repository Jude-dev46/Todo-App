import React from "react";

import classes from "./ListItem.module.css";

const ListItem = (props) => {
  const handleCheckboxClick = () => {
    props.onRemove(props.id);
  };

  return (
    <li className={classes.list} key={props.id}>
      <div className={classes["list-content"]}>
        <h3>{props.title}</h3>
        <div>{props.description}</div>
        <div className={classes.duration}>{props.duration}</div>
      </div>
      <input
        type="checkbox"
        className={classes.box}
        onClick={handleCheckboxClick}
      />
    </li>
  );
};

export default ListItem;
