import React from 'react';

const DeleteButton = (props) => {
  return (
    <button className="delete" value={props.value} onClick={(e)=>{props.deleteFunc(e)}}>
      x
    </button>
  )
}
export default DeleteButton;
