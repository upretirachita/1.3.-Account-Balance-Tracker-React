import React from "react";
import PropTypes from "prop-types";
import "./AddButton.css";

const AddButton = props => {
  return (
    <button id="add" onClick={props.handleClick}>
      Add
    </button>
  );
};

export default AddButton;

AddButton.propTypes = {
  handleClick: PropTypes.func
};
