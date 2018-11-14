import React from "react";

const Header = props => {
  return (
    <header>
      <div id="input-container">
        <h1>Account Balance Tracker</h1>

        <div id="span-container">
          <span id="description-message" className={props.classNameDescrSpan}>
            Please enter the description of your entry (max 13 charecters)
          </span>
          <span id="amount-message" className={props.classNameAmntSpan}>
            Please enter the correct amount (using numbers and dot only, max. 9
            digits)
          </span>
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
          value={props.amount}
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
