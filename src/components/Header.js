import React, {Component} from 'react'

class Header extends Component {
  render () {
    return(
      <header>
        <div id="input-container" >

        <h1>Account Balance Tracker</h1>

          <div id="span-container">
            <span  className={this.props.classNameDescrSpan}>Please enter the description of your entry</span>
            <span  className={this.props.classNameAmntSpan}>Please enter the correct amount</span>
          </div>

        <input 
        type="text" 
        placeholder="Description" 
        id="description"  
        className={this.props.classNameDescrInput} 
        onChange={(e)=>{this.props.getDescription(e)}} 
        value={this.props.description}
        />

        <input 
          type="text" 
          placeholder="Amount" 
          id="amount" 
          className={this.props.classNameAmntInput}
          onChange={(e)=>{this.props.getAmount(e)}}
          value={this.props.amount}
        />

        <select 
          id="transaction-type" 
          onChange={this.props.getOption} 
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button id="add" onClick={this.props.addEntry}>Add</button>

        </div>

      </header>
    )
  }
};    


export default Header