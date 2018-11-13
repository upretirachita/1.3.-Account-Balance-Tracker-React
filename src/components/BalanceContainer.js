import React from 'react';

const Balance = (props) => {
  return (
    <div id="balance-container">

      <h3 id="h3-balance">Balance</h3>

      <div className="total-container">

        <span>Total:</span>
        <span id="total-balance" className={props.makeBalanceRed()}>
          {props.switchDotToAComma(props.balance.toFixed(2))} €
        </span>

      </div>

    </div>
  );
}

export default Balance;
