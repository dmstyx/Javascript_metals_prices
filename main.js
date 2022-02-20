var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-14sctkzpjtjjd-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let btnAdd = document.querySelector('#addBtn');
let metalWeight = document.querySelector('#weight');
let metalSymbol = document.querySelector('#symbols');
let metalCurrency = document.querySelector('#currency');
let metalUnit = document.querySelector('#units');
let count = 0;

btnAdd.addEventListener('click', () =>{
  let weight = metalWeight.value;
  let symbol = metalSymbol.value;
  let currency = metalCurrency.value;
  let unit = metalUnit.value;

  populate(weight, symbol, currency, unit);

})

async function populate(weight, symbol, currency, unit) {

  // const metalsData = await fetch(`https://www.goldapi.io/api/${symbol}/${currency}`, requestOptions);
  // const data = await metalsData.json();

  const data = {
    "timestamp": 1645019282,
    "metal": "XAU",
    "currency": "USD",
    "exchange": "FOREXCOM",
    "symbol": "FOREXCOM:XAUUSD",
    "prev_close_price": 1853.51,
    "open_price": 1853.51,
    "low_price": 1850.38,
    "high_price": 1859.65,
    "open_time": 1644969600,
    "price": 1856.67,
    "ch": 3.16,
    "chp": 0.17,
    "ask": 1857,
    "bid": 1856.22
  }

  console.log(data);

  populateResults(data, weight, symbol, currency, unit);
}

window.onload = function(){
  $('.ui.dropdown').dropdown();
};

function myFunction(id) {
  var el = document.getElementById(id);
  el.remove();
}


function populateResults(obj, weight, symbol, currency, unit) {
  
  const table = document.querySelector('table');
  let symbolDict = {
    "XAU": "Gold",
    "XAG": "Silver",
    "XPT": "Platinum",
    "XPD": "Palladium"}


  count+=1;

  
  let template = `
                  <tr class="center aligned" id='${count}'>
                    <td>${symbolDict[symbol]} </td>
                    <td>${weight}${unit}}</td>
                    <td>${obj['price'] * unit}</td>
                    <td>${currency} ${obj['price']}</td>
                    
                    <td><button onclick="myFunction(${count})" class="ui grey button">Remove</button></td>
                  </tr>`;
  
  table.innerHTML += template;
  
};
