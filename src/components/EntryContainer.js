import React from "react";
import DeleteButton from "./DeleteButton";
import PropTypes from "prop-types";
import "./EntryContainer.css";

const EntryContainer = props => {
  return (
    <div className="entry-container" id={props.id + "-container"}>
      <h3 id={"h3-" + props.id}>{props.name}</h3>

      <div id={props.id}>
        {props.data.map(element => (
          <div key={element.id + "entry"} className="added">
            <DeleteButton
              value={element.id}
              deleteEntry={props.deleteEntry}
              array={props.data}
              incomeOrExpense={props.id}
            />
            <span className="dateAndTime">{element.time}</span>
            <span
              id="description-value"
              className="description-entry-input"
              contentEditable="true"
              onBlur={e => {
                props.editEntry(
                  element.id,
                  props.data,
                  props.id,
                  e,
                  element.description
                );
              }}
              onKeyUp={e => {
                if (e.key === "Enter") {
                  props.editEntry(
                    element.id,
                    props.data,
                    props.id,
                    e,
                    element.description
                  );
                }
              }}
              suppressContentEditableWarning="true"
            >
              {element.description}
            </span>
            <span id="amount-value">
              {(props.name === "Expense" ? "-" : "") +
                props.beautifyNumber(element.amount.toFixed(2))}{" "}
              €
            </span>
          </div>
        ))}
      </div>

      <div className="total-container" id={props.totalContainerId}>
        <span>{props.total}</span>
        <span id="total">
          {(props.name === "Expense" && props.totalAmount > 0 ? "-" : "") +
            props.beautifyNumber(props.totalAmount)}{" "}
          €
        </span>
      </div>
    </div>
  );
};

export default EntryContainer;

EntryContainer.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  total: PropTypes.string,
  totalAmount: PropTypes.string,
  data: PropTypes.array,
  deleteEntry: PropTypes.func,
  beautifyNumber: PropTypes.func,
  idForTotalContainer: PropTypes.string
};
