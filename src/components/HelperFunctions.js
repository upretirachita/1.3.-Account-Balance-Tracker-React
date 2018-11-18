function numbersWithZero(number) {
  return String("000" + number).slice(-2);
}

export function displayDateTime() {
  let date = new Date();
  let day = numbersWithZero(date.getDate());
  let month = numbersWithZero(date.getMonth() + 1);
  let year = date.getFullYear();
  let hour = numbersWithZero(date.getHours());
  let minutes = numbersWithZero(date.getMinutes());
  return `${day}/${month}/${year} ${hour}:${minutes}`;
}

export function userIdGenerator() {
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

export function putInLocalStorage(arraytoPut, lsArrayNameStr) {
  localStorage.setItem(lsArrayNameStr, JSON.stringify(arraytoPut));
}

export function getFromLocalStorage(lsArrayNameStr) {
  return JSON.parse(localStorage.getItem(lsArrayNameStr));
}

export let lsIncome = getFromLocalStorage("income");
export let lsExpense = getFromLocalStorage("expense");
export let lsTotalIncome = 0;
export let lsTotalExpense = 0;

export function getInitialTotals() {
  if (lsIncome && lsExpense) {
    lsIncome.forEach(income => (lsTotalIncome += income.amount));
    lsExpense.forEach(expense => (lsTotalExpense += expense.amount));
  }
}

export function validateEdit(e) {
  let target = e.target;
  target.className = "description-entry-input-red";
  let showRed = setInterval(function() {
    target.className = "description-entry-input";
  }, 200);
  let hideRed = setInterval(function() {
    target.className = "description-entry-input-red";
  }, 400);
  setTimeout(function() {
    clearInterval(showRed);
    clearInterval(hideRed);
    target.className = "description-entry-input";
  }, 700);
}
