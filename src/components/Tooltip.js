import React from "react";
import PropTypes from "prop-types";
import "./Tooltip.css";

const Tooltip = props => {
  return (
    <span id={props.id} className="visible">
      {props.text}
    </span>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string
};
