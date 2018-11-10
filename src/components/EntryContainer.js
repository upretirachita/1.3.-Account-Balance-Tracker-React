import React from 'react';
import DeleteButton from './DeleteButton';

const EntryContainer = (props) => {
  return (
    <div className="entry-container" id={props.id + '-container'}>
      <h3 id={'h3-'+ props.id}>{props.name}</h3>
        <div id={props.id}> 
          {props.data.map(element => 
            <div key={element.id} className="added">
              <span className="dateAndTime">{element.time}</span>
              <span id="description-value">{element.description}</span>
              <span id="amount-value">{props.addMinus + props.switchDotToAComma(element.amount.toFixed(2))} €</span>
              <DeleteButton value={element.id} deleteFunc={props.deleteFunc}/>
            </div>)}
        </div>
      <div className="total-container" id={props.idForTotalContainer}>
        <span>{props.total}</span>
        <span id="total">{props.addMinus + props.switchDotToAComma(props.totalAmount)} €</span>
      </div>
    </div>
  )
}

export default EntryContainer;
