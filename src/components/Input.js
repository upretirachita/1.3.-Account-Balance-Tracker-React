import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      id={props.id}
      className={props.className}
      onChange={e => {
        props.getValue(e);
      }}
      value={props.inputValue}
    />
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  getDescription: PropTypes.func,
  value: PropTypes.string
};
