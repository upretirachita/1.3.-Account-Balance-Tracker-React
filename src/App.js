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
  let dat = `${day}/${month}/${year}`
  let time = `${hour}:${minutes}`
  return `${day}/${month}/${year} ${hour}:${minutes}`
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
    amount: '',
    totalIncome: 600,
    totalExpense: 300,
    incomeOrExpense: 'income',
    balance: 300,
    setClassDescr: 'warning',
    setClassAmnt: 'warning',
    descrInputClass: 'default',
    amntInputClass: 'default'
  })
  
  setDescription = (e) => {
    this.setState({
      description: e.target.value, 
      setClassDescr: 'warning', 
      descrInputClass: 'default'
    })
  }
  setAmount = (e) => {
    if(isNaN(e.target.value)){
      this.setState({
        amount: '', 
        setClassAmnt: 'warning-visible',
        amntInputClass: 'red'
      })
    } else {
      this.setState({
        amount: e.target.value, 
        setClassAmnt: 'warning',
        amntInputClass: 'default'})
    }
  }
  setOption = (e) => {
    this.setState({incomeOrExpense: e.target.value})
  }
  addEntry = () => {
    if(this.state.incomeOrExpense === 'income' && this.state.amount !== '' && this.state.description !== ''){

      this.setState(
        {income: 
          [...this.state.income, 
            {description: this.state.description,
            amount: this.state.amount, 
            time:displayDateTime(),
            id: userIdGenerator()}],
          amount: '',
          description:'',
          totalIncome: this.state.totalIncome + parseInt(this.state.amount), 
          balance: this.state.balance + parseInt(this.state.amount),
        });
      putInLocalStorage(this.state.income, 'income')

    } else if (this.state.incomeOrExpense === 'expense' && this.state.amount !== '' && this.state.description !== '') {
      this.setState({expense: 
        [...this.state.expense, 
          {description: this.state.description, 
          amount: this.state.amount,
          time:displayDateTime(),
          id: userIdGenerator()}],
        amount: '',
        description:'',
        totalExpense: this.state.totalExpense + parseInt(this.state.amount),
        balance: this.state.balance - parseInt(this.state.amount)});
      putInLocalStorage(this.state.expense, 'expense')

    } else if(this.state.amount === '' && this.state.description !== ''){
      this.setState({
        setClassAmnt: 'warning-visible',
        amntInputClass: 'red'
      }); 

    } else if(this.state.amount !== '' && this.state.description === ''){
      this.setState({
        setClassDescr: 'warning-visible',
        descrInputClass: 'red'}); 

    } else {
      this.setState({
        setClassDescr: 'warning-visible', 
        setClassAmnt: 'warning-visible', 
        amntInputClass: 'red', 
        descrInputClass: 'red'}); 
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div id="input-container" >
          <span  className={this.state.setClassDescr}>Please enter description</span>
          <span  className={this.state.setClassAmnt}>Please enter the right amount using numbers</span>
          <input type="text" placeholder="Description" id="description" onInput={(e)=>{this.setDescription(e)}} value= {this.state.description} className={this.state.descrInputClass}/>
          <input type="text" placeholder="Amount" id="amount"onInput={(e)=>{this.setAmount(e)}} value= {this.state.amount} className={this.state.amntInputClass}/>
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
