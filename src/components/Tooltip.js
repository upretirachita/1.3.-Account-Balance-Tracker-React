import React from "react";
import PropTypes from "prop-types";
import "./Tooltip.css";

const Tooltip = props => {
  return (
    <span id={props.id} className={props.className}>
      {props.text}
    </span>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string
};
