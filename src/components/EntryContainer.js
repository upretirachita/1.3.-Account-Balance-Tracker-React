import React, { Component } from 'react';

const EntryContainer = (props) => {
  return (
    <div className="entry-container" id={props.id + '-container'}>
      <h3 id={'h3-'+ props.id}>{props.name}</h3>
        <div id={props.id}> 
          {props.data.map(element => <div className='added'><span>{element.time}</span> <span id='name'>{element.description}</span> <span id='amountSpan'>{element.amount}€</span></div>)}
        </div>
      <div className="total-container">
        <span>{props.total}</span>
        <span id="total">{props.totalAmount} €</span>
      </div>
    </div>
  )
}

export default EntryContainer;
