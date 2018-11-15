import React from "react";
import PropTypes from "prop-types";
import "./BalanceContainer.css";

const Balance = props => (
  <div id="balance-container">
    <div className="total-balance-container">
      <span>Total balance:</span>
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

Balance.propTypes = {
  makeBalanceRed: PropTypes.func,
  beautifyNumber: PropTypes.func,
  balance: PropTypes.number
};
