import React from "react";
import Tooltip from "./Tooltip";

const Header = props => {
  let bla;
  if (props.classNameDescrSpan === "visibleDescr") {
    bla = (
      <Tooltip
        id="description-message"
        className={props.classNameDescrSpan}
        text="Please enter the description of your entry (max 16 charecters)"
      />
    );
  }

  let bla2;
  if (props.classNameAmntSpan === "visibleAmnt") {
    bla2 = (
      <Tooltip
        id="amount-message"
        className={props.classNameAmntSpan}
        text="Please enter the correct amount (using numbers and dot only, max. 9 digits)"
      />
    );
  }

  return (
    <header>
      <div id="input-container">
        <h1>Account Balance Tracker</h1>

        <div id="span-container">
          {bla} {bla2}
        </div>

        <input
          type="text"
          placeholder="Description"
          id="description"
          className={props.classNameDescrInput}
          onChange={e => {
            props.getDescription(e);
          }}
          value={props.description}
        />

        <input
          type="text"
          placeholder="Amount"
          id="amount"
          className={props.classNameAmntInput}
          onChange={e => {
            props.getAmount(e);
          }}
          value={props.amountInput}
        />
        <span className="custom-dropdown">
          <select onChange={props.getTransactionType}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </span>
        <button id="add" onClick={props.addEntry}>
          Add
        </button>
      </div>
    </header>
  );
};

export default Header;
