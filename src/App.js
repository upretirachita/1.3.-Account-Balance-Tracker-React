import React, { Component } from "react";
import InputContainer from "./components/InputContainer";
import EntryContainer from "./components/EntryContainer";
import Balance from "./components/BalanceContainer";
import "./App.css";
import {
  displayDateTime,
  userIdGenerator,
  getInitialTotals,
  putInLocalStorage,
  lsIncome,
  lsExpense,
  lsTotalIncome,
  lsTotalExpense,
  validateEdit
} from "./components/HelperFunctions";

getInitialTotals();

class App extends Component {
  state = {
    income: lsIncome || [], // gets initial value from local storage
    expense: lsExpense || [], // gets initial value from local storage
    totalIncome: lsTotalIncome || 0, // gets initial value from local storage
    totalExpense: lsTotalExpense || 0, // gets initial value from local storage
    balance: lsTotalIncome - lsTotalExpense,
    description: "", // user input
    amount: "", // user input
    amountInput: "",
    typeOfEntry: "income", // selection 'income' or 'expense'
    descriptionValid: true,
    amountValid: true,
    editValid: true,
    incomeEditValid: true,
    expenseEditValid: true
  };

  getDescription = e => {
    if (e.target.value.length <= 17) {
      this.setState({
        description: e.target.value.toString(),
        descriptionValid: true,
        incomeEditValid: true,
        expenseEditValid: true
      });
    } else {
      this.setState({
        description: "",
        descriptionValid: false,
        incomeEditValid: true,
        expenseEditValid: true
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
        amountInput: "",
        amount: "",
        amountValid: false,
        incomeEditValid: true,
        expenseEditValid: true
      });
    } else {
      this.setState({
        amountInput: e.target.value,
        amount: parseFloat(e.target.value),
        amountValid: true,
        incomeEditValid: true,
        expenseEditValid: true
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
        amountInput: "",
        amount: "",
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
        amountInput: "",
        amount: "",
        description: "",
        totalExpense: this.state.totalExpense + this.state.amount,
        balance: this.state.balance - this.state.amount
      });

      putInLocalStorage(newExpense, "expense");
    } else if (this.state.amount === "" && this.state.description !== "") {
      this.setState({
        amountValid: false
      });
    } else if (this.state.amount !== "" && this.state.description === "") {
      this.setState({
        descriptionValid: false
      });
    } else {
      this.setState({
        descriptionValid: false,
        amountValid: false
      });
    }
  };
  editEntry = (id, array, incomeOrExpense, e, initialText) => {
    let newEntry = e.target.textContent;
    e.target.textContent = initialText;
    if (newEntry.length < 17 && newEntry !== "") {
      let newArray = array.map(object => {
        let result;
        if (!object.id.includes(id)) {
          result = object;
        } else {
          result = { ...object, description: newEntry };
        }
        return result;
      });
      if (incomeOrExpense === "income") {
        this.setState({
          income: newArray,
          incomeEditValid: true,
          expenseEditValid: true
        });
        putInLocalStorage(newArray, "income");
      } else {
        this.setState({
          expense: newArray,
          expenseEditValid: true,
          incomeEditValid: true
        });
        putInLocalStorage(newArray, "expense");
      }
      e.target.blur();
    } else if (
      newEntry.length >= 17 ||
      (newEntry === "" && incomeOrExpense === "income")
    ) {
      this.setState({
        incomeEditValid: false,
        expenseEditValid: true
      });
      e.target.textContent = initialText;
      validateEdit(e);
      e.target.blur();
    } else if (
      newEntry.length >= 17 ||
      (newEntry === "" && incomeOrExpense === "expense")
    ) {
      this.setState({
        incomeEditValid: true,
        expenseEditValid: false
      });
      e.target.textContent = initialText;
      validateEdit(e);
      e.target.blur();
    }
  };

  deleteEntry = (id, array, incomeOrExpense) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      let deletedEntryAmount;

      let newArray = array.filter(object => {
        let result;
        if (!object.id.includes(id)) {
          result = object;
        } else {
          deletedEntryAmount = object.amount;
        }
        return result;
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
  // returns the wanted number as a string with comma for decimal space and dot for thousand, million etc.
  beautifyNumber = number => {
    let safeFix = parseFloat(number).toFixed(2);
    let numToStr = safeFix.toString();
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
        <header>
          <h1>Account Balance Tracker</h1>
          <InputContainer
            descriptionValid={this.state.descriptionValid}
            amountValid={this.state.amountValid}
            getDescription={this.getDescription}
            getAmount={this.getAmount}
            getTransactionType={this.getTransactionType}
            addEntry={this.addEntry}
            description={this.state.description}
            amountInput={this.state.amountInput}
          />
        </header>

        <main className="main">
          <EntryContainer
            name="Income"
            id="income"
            total="Total income:"
            totalAmount={this.state.totalIncome}
            data={this.state.income}
            deleteEntry={this.deleteEntry}
            beautifyNumber={this.beautifyNumber}
            totalContainerId="total-income"
            editEntry={this.editEntry}
            editValid={this.state.incomeEditValid}
          />

          <EntryContainer
            name="Expense"
            id="expense"
            total="Total expense:"
            totalAmount={this.state.totalExpense}
            data={this.state.expense}
            deleteEntry={this.deleteEntry}
            beautifyNumber={this.beautifyNumber}
            totalContainerId="total-expense"
            editEntry={this.editEntry}
            editValid={this.state.expenseEditValid}
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
