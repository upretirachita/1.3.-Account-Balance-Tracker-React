import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import EntryContainer from './components/EntryContainer';

// ********************************* HELPER FUNCTIONS *********************************

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
  return `${day}/${month}/${year} ${hour}:${minutes}`
}

function userIdGenerator() {
  let characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let id = '';
  for (let i = 0; i < 7; i++) {
    let random = Math.floor(Math.random() * 61);
    id = id.concat(characters.charAt(random));
  }
  return id
}
// ********************************* HANDLING DATA IN LOCAL STORAGE *********************************

function putInLocalStorage(arraytoPut, lsArrayNameStr) {
  localStorage.setItem(lsArrayNameStr, JSON.stringify(arraytoPut));
}

function getFromLocalStorage(lsArrayNameStr) {
  return JSON.parse(localStorage.getItem(lsArrayNameStr));
}

let lsIncome = getFromLocalStorage('income')
let lsExpense = getFromLocalStorage('expense')
let lsTotalIncome = 0;
let lsTotalExpense = 0;

const getInitialTotals = () => {
  lsIncome.forEach(income => lsTotalIncome += income.amount)
  lsExpense.forEach(expense => lsTotalExpense += expense.amount)
}

getInitialTotals()

// **************************************************************************************
// **********************************--- APP ---*****************************************
// **************************************************************************************

class App extends Component {
  state = ({
    income: lsIncome, // gets initial value from local storage
    expense: lsExpense, // gets initial value from local storage
    totalIncome: lsTotalIncome, // gets initial value from local storage
    totalExpense: lsTotalExpense, // gets initial value from local storage
    balance: lsTotalIncome - lsTotalExpense,
    description: '', // user input
    amount: '', // user input
    field: 'income', // selection 'income' or 'expense'
    classNameDescrSpan: 'invisible', // opposite is 'visible'
    classNameAmntSpan: 'invisible', // opposite is 'visible'
    classNameDescrInput: 'default', // opposite is 'red'
    classNameAmntInput: 'default' // opposite is 'red'
  })
  
  getDescription = (e) => {
      this.setState({
        description: e.target.value.toString(), 
        classNameDescrSpan: 'invisible', 
        classNameDescrInput: 'default'
      })
  }

  getAmount= (e) => {
    if(isNaN(e.target.value)){
      this.setState({
        amount: '', 
        classNameAmntSpan: 'visible',
        classNameAmntInput: 'red'
      })
    } else {
      this.setState({
        amount: parseFloat(e.target.value), 
        classNameAmntSpan: 'invisible',
        classNameAmntInput: 'default'
      })
    }
  }

  getOption = (e) => {
    this.setState({field: e.target.value})
  }

  addEntry = () => {
    if(this.state.field === 'income' && this.state.amount !== '' && this.state.description !== ''){

      let newIncome = [
        ...this.state.income, {
          description: this.state.description,
          amount: this.state.amount, 
          time:displayDateTime(),
          id: userIdGenerator()
        }
      ]

      this.setState({
        income: newIncome,
        amount: '',
        amField: '',
        description:'',
        totalIncome: this.state.totalIncome + this.state.amount, 
        balance: this.state.balance + this.state.amount
      });

      putInLocalStorage( newIncome, 'income');
      this.descRef.value = '';
      this.amtRef.value = '';

    } else if (this.state.field === 'expense' && this.state.amount !== '' && this.state.description !== '') {

      let newExpense = [
        ...this.state.expense, {
          description: this.state.description, 
          amount: this.state.amount, 
          time:displayDateTime(),
          id: userIdGenerator()
        }
      ]

      this.setState({
        expense: newExpense,
        amount: '',
        amField: '',
        description:'',
        totalExpense: this.state.totalExpense + this.state.amount,
        balance: this.state.balance - this.state.amount
      });

      putInLocalStorage(newExpense, 'expense');
      this.descRef.value = '';
      this.amtRef.value = '';

    } else if (this.state.amount === '' && this.state.description !== '') {

      this.setState({
        classNameAmntSpan: 'visible',
        classNameAmntInput: 'red'
      }); 

    } else if (this.state.amount !== '' && this.state.description === '') {

      this.setState({
        classNameDescrSpan: 'visible',
        classNameDescrInput: 'red'
      }); 

    } else {

      this.setState({
        classNameDescrSpan: 'visible', 
        classNameDescrInput: 'red',
        classNameAmntSpan: 'visible', 
        classNameAmntInput: 'red' 
      }); 
    }
  }

  deleteEntryIncome = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      let deletedIncome;

      let newIncome = this.state.income.filter(income => {
          if (!income.id.includes(id)) {
            return income
          } else {
            deletedIncome = income.amount
          }
      })

      this.setState({
        income: newIncome, 
        totalIncome: this.state.totalIncome - deletedIncome, 
        balance: this.state.totalIncome - this.state.totalExpense - deletedIncome 
      })
    }
  }

  deleteEntryExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      let deletedExpense;

      let newExpense = this.state.expense.filter(expense => {
        let result;

          if (!expense.id.includes(id)) {
            result = expense
          } else {
            deletedExpense = expense.amount
          }
          return result
      })
      this.setState({
        expense: newExpense, 
        totalExpense: this.state.totalExpense - deletedExpense, 
        balance: this.state.totalIncome - this.state.totalExpense + deletedExpense
      })
    }
  }

  makeBalanceRed = () => {
    if(this.state.balance < 0) {
      return "red-balance"
    } else {
      return "default-balance"
    }
  }

  addMinus= () => {
    if (this.state.totalExpense > 0) {
      return '-' + this.state.totalExpense.toFixed(2)
    } else {
      return this.state.totalExpense.toFixed(2)
    }
  }

  render() {
    return (
      <div className="App">

        <Header />

        <div id="input-container" >
          <span  className={this.state.classNameDescrSpan}>Please enter description</span>
          <span  className={this.state.classNameAmntSpan}>Please enter the right amount using numbers</span>
          
          <input 
            type="text" 
            placeholder="Description" 
            id="description"  
            className={this.state.classNameDescrInput} 
            onInput={(e)=>{this.getDescription(e)}} 
            ref={(input)=>{this.descRef = input}}
          />

          <input 
            type="text" 
            placeholder="Amount" 
            id="amount" 
            className={this.state.classNameAmntInput}
            onInput={(e)=>{this.getAmount(e)}}
            ref={(input)=>{this.amtRef = input}}
          />

          <select id="transaction-type" onChange={this.getOption}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button id="add" onClick={this.addEntry}>Add</button>
          
        </div>

        <main className="main">

          <EntryContainer 
          name='Income'
          id='income'
          total='Total income:'
          totalAmount={this.state.totalIncome.toFixed(2)}
          data={this.state.income}
          deleteFunc={this.deleteEntryIncome}
          />

          <EntryContainer 
          name='Expense'
          id='expense'
          total='Total expense:'
          totalAmount={this.addMinus()}
          data={this.state.expense}
          deleteFunc={this.deleteEntryExpense}
          />

          <div id="balance-container">
            <h3 id="h3-balance">Balance</h3>
            <div className="total-container">
                <span>Total:</span>
                <span id="total-balance" className={this.makeBalanceRed()}>{this.state.balance.toFixed(2)}€</span>
            </div>
          </div>

        </main>

      </div>
    );
  }
}

export default App;
