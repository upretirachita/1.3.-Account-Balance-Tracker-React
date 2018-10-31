import React, {Component} from 'react';
import trash from '../assets/trash.svg'

const DeleteButton  = (props) => {
    return (<button  className = 'delete' value = {props.value} onClick = {(e)=>{props.funct1(e)}}>x</button>);
}

export default DeleteButton;

// <img src={trash}alt="trash-icon"/>