import React from "react";
import PropTypes from "prop-types";
import "./CustomDropdown.css";

const CustomDropdown = props => {
  return (
    <span className="custom-dropdown">
      <select onChange={props.getTransactionType}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </span>
  );
};

export default CustomDropdown;

CustomDropdown.propTypes = {
  getTransactionType: PropTypes.func
};
