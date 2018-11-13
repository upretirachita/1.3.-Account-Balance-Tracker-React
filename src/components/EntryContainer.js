import React from "react";
import DeleteButton from "./DeleteButton";

const EntryContainer = props => {
  return (
    <div className="entry-container" id={props.id + "-container"}>
      <h3 id={"h3-" + props.id}>{props.name}</h3>

      <div id={props.id}>
        {props.data.map(element => (
          <div key={element.id + "entry"} className="added">
            <DeleteButton value={element.id} deleteFunc={props.deleteFunc} />
            <span className="dateAndTime">{element.time}</span>
            <span id="description-value">{element.description}</span>
            <span id="amount-value">
              {(props.name === "Expense" ? "-" : "") +
                props.beautifyNumber(element.amount.toFixed(2))}{" "}
              €
            </span>
          </div>
        ))}
      </div>

      <div className="total-container" id={props.idForTotalContainer}>
        <span>{props.total}</span>
        <span id="total">
          {(props.name === "Expense" ? "-" : "") +
            props.beautifyNumber(props.totalAmount)}{" "}
          €
        </span>
      </div>
    </div>
  );
};

export default EntryContainer;
