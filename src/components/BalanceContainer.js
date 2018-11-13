import React from "react";

const Balance = props => (
  <div id="balance-container">
    <h3 id="h3-balance">Balance</h3>
    <div className="total-container">
      <span>Total:</span>
      <span
        id="total-balance"
        className={props.balance < 0 ? "red-balance" : "default-balance"}
      >
        {props.beautifyNumber(props.balance.toFixed(2))} €
      </span>
    </div>
  </div>
);

export default Balance;
