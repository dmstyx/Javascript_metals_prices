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
  let unit = metalUnit.textContent;

  if (isNaN(weight)){
    alert('Please input numeric characters only');
  }else{
    populate(weight, symbol, currency, unit);
  };

})

async function populate(weight, symbol, currency, unit) {

  const metalsData = await fetch(`https://www.goldapi.io/api/${symbol}/${currency}`, requestOptions);
  const data = await metalsData.json();
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
  
  let unitDict = {
    "oz": 1,
    "g": 0.03527396195,
    "kg": 35.27396195,
    "lb": 16,
  }

  let spotPrice = Intl.NumberFormat().format(obj['price'] * unitDict[unit])
  let value = Intl.NumberFormat('en-GB', {style: 'currency', currency: `${currency}`}).format(obj['price'] * unitDict[unit] * weight)

  count+=1;

  let template = `
                  <tr class="center aligned" id='${count}'>
                    <td>${symbolDict[symbol]} </td>
                    <td>${weight}${unit}</td>
                    <td>${spotPrice}</td>
                    <td>${value}</td>
                    
                    <td><button onclick="myFunction(${count})" class="ui grey button">Remove</button></td>
                  </tr>`;
  
  table.innerHTML += template;
  
};
