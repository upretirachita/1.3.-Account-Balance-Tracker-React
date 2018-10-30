import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import EntryContainer from './components/EntryContainer';

function putInLocalStorage(arr, local) {
  let bla = JSON.stringify(arr);
  localStorage.setItem(local, bla);
}

function getFromLocalStorage(local) {
  let result = JSON.parse(localStorage.getItem(local));
  return result
}

function numbersWithZero(number) {
  return String("000" + number).slice(-2);
}

function displayDateTime() {
  let date = new Date();
  let day = numbersWithZero(date.getDate());
  let month = numbersWithZero(date.getMonth() + 1);
  let year = date.getFullYear();
  let hour = numbersWithZero(date.getHours());
  let minutes = numbersWithZero(date.getMinutes());
  let date1 = <span id= "date">{day}/{month}/{year}</span> 
  let time = <span id= "time">{hour}:{minutes}</span>
  return [date1, time]
}

function userIdGenerator() {
  var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var id = '';
  for (let i = 0; i < 7; i++) {
    var random = Math.floor(Math.random() * 35);
    id = id.concat(characters.charAt(random));
  }
  return id
}


class App extends Component {
  state = ({
    income: [{description: 'blavjvjvvvj', amount: 300, time:displayDateTime(), id: userIdGenerator()}, {description: 'blavjvjvvvj', amount: 300, time:displayDateTime(), id: userIdGenerator()}],
    expense:[{description: 'expense', amount: 300, time:displayDateTime(), id: userIdGenerator()}],
    description: '',
    amount: 0,
    totalIncome: 600,
    totalExpense: 300,
    incomeOrExpense: 'income',
    balance: 300
  })
  
  setDescription = (e) => {
    this.setState({description: e.target.value})
  }
  setAmount = (e) => {
    this.setState({amount: e.target.value})
  }
  setOption = (e) => {
    console.log(e.target.value);
    this.setState({incomeOrExpense: e.target.value})
  }
  addEntry = () => {
    if(this.state.incomeOrExpense === 'income'){
      this.setState({income: [...this.state.income, {description: this.state.description, amount: this.state.amount, time:displayDateTime(), id: userIdGenerator()}], totalIncome: this.state.totalIncome + parseInt(this.state.amount), balance: this.state.balance + parseInt(this.state.amount)});
      putInLocalStorage(this.state.income, 'income')
    } else {
      this.setState({expense: [...this.state.expense, {description: this.state.description, amount: this.state.amount, time:displayDateTime(), id: userIdGenerator()}], totalExpense: this.state.totalExpense + parseInt(this.state.amount), balance: this.state.balance - parseInt(this.state.amount)});
      putInLocalStorage(this.state.expense, 'expense')
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div id="input-container" >
          <span id="warning">Please enter the right description and amount</span>
          <input type="text" placeholder="Description" id="description" onInput={(e)=>{this.setDescription(e)}}/>
          <input type="text" placeholder="Amount" id="amount"onInput={(e)=>{this.setAmount(e)}}/>
          <select name="" id="transaction-type" onChange={this.setOption}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button id="add" onClick={this.addEntry}>Add</button>
        </div>
        <div id="main">
          <EntryContainer 
          name= 'Income'
          id='income'
          total='Total income:'
          totalAmount= {this.state.totalIncome}
          data = {this.state.income}
          />
          <EntryContainer 
          name= 'Expense'
          id='expense'
          total='Total expense:'
          totalAmount= {this.state.totalExpense}
          data = {this.state.expense}
          />
          <div id="balance-container">
            <h3 id="h3-balance">Balance</h3>
            <div className="total-container">
                <span>Total:</span>
                <span id="total-balance">{this.state.balance}€</span>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
