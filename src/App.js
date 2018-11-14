import React, { Component } from "react";
import Header from "./components/Header";
import EntryContainer from "./components/EntryContainer";
import Balance from "./components/BalanceContainer";
import "./App.css";

// *************** TO DO ******************
//  - add edit function
//  - make tooltips with components
//  - use reduce in calculating balance
//  - add prop types
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
  return `${day}/${month}/${year} ${hour}:${minutes}`;
}

function userIdGenerator() {
  let characters =
    "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < 7; i++) {
    let random = Math.floor(Math.random() * 61);
    id = id.concat(characters.charAt(random));
  }
  return id;
}
// ********************************* HANDLING DATA IN LOCAL STORAGE *********************************

function putInLocalStorage(arraytoPut, lsArrayNameStr) {
  localStorage.setItem(lsArrayNameStr, JSON.stringify(arraytoPut));
}

function getFromLocalStorage(lsArrayNameStr) {
  return JSON.parse(localStorage.getItem(lsArrayNameStr));
}

let lsIncome = getFromLocalStorage("income");
let lsExpense = getFromLocalStorage("expense");
let lsTotalIncome = 0;
let lsTotalExpense = 0;

const getInitialTotals = () => {
  if (lsIncome && lsExpense) {
    lsIncome.forEach(income => (lsTotalIncome += income.amount));
    lsExpense.forEach(expense => (lsTotalExpense += expense.amount));
  }
};

getInitialTotals();

// **************************************************************************************
// **********************************--- APP ---*****************************************
// **************************************************************************************

class App extends Component {
  state = {
    income: lsIncome || [], // gets initial value from local storage
    expense: lsExpense || [], // gets initial value from local storage
    totalIncome: lsTotalIncome || 0, // gets initial value from local storage
    totalExpense: lsTotalExpense || 0, // gets initial value from local storage
    balance: lsTotalIncome - lsTotalExpense,
    description: "", // user input
    amount: "", // user input
    typeOfEntry: "income", // selection 'income' or 'expense'
    classNameDescrSpan: "invisible", // opposite is 'visibleDescr'
    classNameAmntSpan: "invisible", // opposite is 'visibleAmnt'
    classNameDescrInput: "default", // opposite is 'red'
    classNameAmntInput: "default" // opposite is 'red'
  };

  getDescription = e => {
    if (e.target.value.length <= 17) {
      this.setState({
        description: e.target.value.toString(),
        classNameDescrSpan: "invisible",
        classNameDescrInput: "default"
      });
    } else {
      this.setState({
        description: "",
        classNameDescrSpan: "visibleDescr",
        classNameDescrInput: "red"
      });
    }
  };

  getAmount = e => {
    if (
      isNaN(e.target.value) ||
      e.target.value < 0 ||
      e.target.value > 1000000000 ||
      e.target.value === "" ||
      e.target.value === " "
    ) {
      this.setState({
        amount: "",
        classNameAmntSpan: "visibleAmnt",
        classNameAmntInput: "red"
      });
    } else {
      this.setState({
        amount: parseFloat(e.target.value),
        classNameAmntSpan: "invisible",
        classNameAmntInput: "default"
      });
    }
  };

  getTransactionType = e => {
    this.setState({ typeOfEntry: e.target.value });
  };

  addEntry = () => {
    if (
      this.state.typeOfEntry === "income" &&
      this.state.amount !== "" &&
      this.state.description !== ""
    ) {
      let newIncome = [
        ...this.state.income,
        {
          description: this.state.description,
          amount: this.state.amount,
          time: displayDateTime(),
          id: userIdGenerator()
        }
      ];

      this.setState({
        income: newIncome,
        amount: "",
        amField: "",
        description: "",
        totalIncome: this.state.totalIncome + this.state.amount,
        balance: this.state.balance + this.state.amount
      });

      putInLocalStorage(newIncome, "income");
    } else if (
      this.state.typeOfEntry === "expense" &&
      this.state.amount !== "" &&
      this.state.description !== ""
    ) {
      let newExpense = [
        ...this.state.expense,
        {
          description: this.state.description,
          amount: this.state.amount,
          time: displayDateTime(),
          id: userIdGenerator()
        }
      ];

      this.setState({
        expense: newExpense,
        amount: "",
        amField: "",
        description: "",
        totalExpense: this.state.totalExpense + this.state.amount,
        balance: this.state.balance - this.state.amount
      });

      putInLocalStorage(newExpense, "expense");
    } else if (this.state.amount === "" && this.state.description !== "") {
      this.setState({
        classNameAmntSpan: "visible",
        classNameAmntInput: "red"
      });
    } else if (this.state.amount !== "" && this.state.description === "") {
      this.setState({
        classNameDescrSpan: "visibleDescr",
        classNameDescrInput: "red"
      });
    } else {
      this.setState({
        classNameDescrSpan: "visibleDescr",
        classNameDescrInput: "red",
        classNameAmntSpan: "visibleAmnt",
        classNameAmntInput: "red"
      });
    }
  };
  deleteEntry = (id, array, incomeOrExpense) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      let deletedEntryAmount;
      let newArray = array.filter(object => {
        if (!object.id.includes(id)) {
          return object;
        } else {
          deletedEntryAmount = object.amount;
        }
      });

      if (incomeOrExpense === "income") {
        this.setState({
          income: newArray,
          totalIncome: this.state.totalIncome - deletedEntryAmount,
          balance:
            this.state.totalIncome -
            this.state.totalExpense -
            deletedEntryAmount
        });

        putInLocalStorage(newArray, "income");
      } else {
        this.setState({
          expense: newArray,
          totalExpense: this.state.totalExpense - deletedEntryAmount,
          balance:
            this.state.totalIncome -
            this.state.totalExpense +
            deletedEntryAmount
        });

        putInLocalStorage(newArray, "expense");
      }
    }
  };
  // adds dot to thousand, million etc..
  addDot = (number, index) => {
    return (
      number.substring(0, number.length - index) +
      "." +
      number.substring(number.length - index, number.length)
    );
  };
  // returns the wanted number as a string with
  beautifyNumber = number => {
    let numToStr = number.toString();

    let numWithComma =
      numToStr.substring(0, numToStr.length - 3) +
      "," +
      numToStr.substring(numToStr.length - 2, numToStr.length);

    let thousand = this.addDot(numWithComma, 6);
    let million = this.addDot(thousand, 10);
    let billion = this.addDot(million, 14);

    if (numToStr[0] !== "-") {
      if (numToStr.length > 12) {
        return billion;
      } else if (numToStr.length > 9) {
        return million;
      } else if (numToStr.length > 6) {
        return thousand;
      } else {
        return numWithComma;
      }
    } else {
      if (numToStr.length > 13) {
        return billion;
      } else if (numToStr.length > 10) {
        return million;
      } else if (numToStr.length > 7) {
        return thousand;
      } else {
        return numWithComma;
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Header
          classNameDescrSpan={this.state.classNameDescrSpan}
          classNameAmntSpan={this.state.classNameAmntSpan}
          classNameDescrInput={this.state.classNameDescrInput}
          getDescription={this.getDescription}
          classNameAmntInput={this.state.classNameAmntInput}
          getAmount={this.getAmount}
          getTransactionType={this.getTransactionType}
          addEntry={this.addEntry}
          description={this.state.description}
          amount={this.state.amount}
        />

        <main className="main">
          <EntryContainer
            name="Income"
            id="income"
            total="Total income:"
            totalAmount={this.state.totalIncome.toFixed(2)}
            data={this.state.income}
            deleteEntry={this.deleteEntry}
            beautifyNumber={this.beautifyNumber}
            idForTotalContainer="incometc"
          />

          <EntryContainer
            name="Expense"
            id="expense"
            total="Total expense:"
            totalAmount={this.state.totalExpense.toFixed(2)}
            data={this.state.expense}
            deleteEntry={this.deleteEntry}
            beautifyNumber={this.beautifyNumber}
            idForTotalContainer="expensetc"
          />

          <Balance
            makeBalanceRed={this.makeBalanceRed}
            beautifyNumber={this.beautifyNumber}
            balance={this.state.balance}
          />
        </main>
      </div>
    );
  }
}

export default App;
