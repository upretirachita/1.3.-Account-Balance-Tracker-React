import React from "react";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import Input from "./Input";
import CustomDropdown from "./CustomDropdown";
import "./InputContainer.css";
import AddButton from "./AddButton";

const Header = props => {
  let descriptionSpan;
  if (!props.descriptionValid) {
    descriptionSpan = (
      <Tooltip
        id="description-message"
        text="Please enter the description of your entry (max 17 charecters)"
      />
    );
  }

  let amountSpan;
  if (!props.amountValid) {
    amountSpan = (
      <Tooltip
        id="amount-message"
        text="Please enter the correct amount (using numbers and dot only, max. 9 digits)"
      />
    );
  }

  return (
    <div id="input-container">
      <div id="span-container">
        {descriptionSpan}
        {amountSpan}
      </div>

      <Input
        type="text"
        placeholder="Description"
        id="description"
        className={props.descriptionValid ? "default" : "red"}
        getValue={props.getDescription}
        inputValue={props.description}
      />

      <Input
        type="text"
        placeholder="Amount"
        id="amount"
        className={props.amountValid ? "default" : "red"}
        getValue={props.getAmount}
        inputValue={props.amountInput}
      />

      <CustomDropdown getTransactionType={props.getTransactionType} />

      <AddButton handleClick={props.addEntry} />
    </div>
  );
};

export default Header;

Header.propTypes = {
  classNameDescrSpan: PropTypes.string,
  classNameAmntSpan: PropTypes.string,
  classNameDescrInput: PropTypes.string,
  getDescription: PropTypes.func,
  classNameAmntInput: PropTypes.string,
  getAmount: PropTypes.func,
  getTransactionType: PropTypes.func,
  addEntry: PropTypes.func,
  description: PropTypes.string,
  amountInput: PropTypes.string
};
