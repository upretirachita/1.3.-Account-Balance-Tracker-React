import React from "react";

const Tooltip = props => {
  return (
    <span id={props.id} className={props.className}>
      {props.text}
    </span>
  );
};

export default Tooltip;
