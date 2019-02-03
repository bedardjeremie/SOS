
// function onClick(element){
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// }

/*chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});*/


// let stockGrowthTen = function(price){
//   let arr = [];
//   let growPrice = 0;
//   arr.push(price)
//   for(var year = 1; year < 10; year++){
//     growPrice = arr[year-1] * 1.07;
//     arr.push(growPrice);
//   }
//   return arr;
// }
function setChart(data){
let rawPrices = data;
let xLabels = []
let count = 0;
data.map(function(x){
  xLabels.push(count);
  count+=1;
})
console.log(rawPrices)
var ctx = document.getElementById("compoundChart").getContext('2d');
var scalemin = rawPrices[0] - rawPrices[0] / 2;
var scaleMax = rawPrices[-1] + rawPrices * 1.5;
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xLabels,
        datasets: [{
            label: '$ You Can Make',
            data: rawPrices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
              ticks: {
                  beginAtZero:false,
                  stepSize: 2
              },
  						display: true,
  						scaleLabel: {
  							display: true,
  							labelString: 'Year'
  						}
        }]
      }
}});
}

// chrome.runtime.onMessage.addListener(function(request, sender) {
//   message.innerText = sender.tab.url;
//   link = sender.tab.url;
// });
function retrieveData(payload){
  const url = 'http://127.0.0.1:5000/analyze';
  fetch(url,
  {
    method: 'POST',
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(function(res){
    console.log(res);
    console.log(res.alternative)
    let oppcost = document.getElementById("oppcost-text")
    let stockText = document.getElementById("stock-text")
    let investText = document.getElementById("invest-text")
    let budgetText = document.getElementById("budget-text")
    let finalBudgetText = ". " + res.budget;
    let finalStockText = "With this cash you could buy " + res.stock.qty.toString() + " shares of " + res.stock.name + "!";
    let finalInvestText = "You could invest $" + res.mutual_fund.graph[0].toString() + " in one of our mutual funds. It could be worth $" + res.mutual_fund.fv.toFixed(2).toString() + "!"
    let finalTextOppCost = "With this cash you could buy " + res.alternative.qty.toString() + " " + res.alternative.name + "!";
    console.log(finalTextOppCost);
    oppcost.innerHTML = finalTextOppCost;
    stockText.innerHTML = finalStockText;
    investText.innerHTML = finalInvestText;
    budgetText.innerHTML = budgetText.innerHTML + finalBudgetText;
    setChart(res.mutual_fund.graph)
  })
}

$( document ).ready(function() {
  //let link = chrome.tab.url;
  let link ="test";
  let budgetIn;
  let budgetText = $('#budget-text');
  // let message = $('#message');
  chrome.storage.sync.get('budget', function(data){
    let budgetAmt = data.budget.toString();
    budgetIn = data.budget.toString();
    budgetText.append(budgetAmt);
  })

  console.log('budgetIn-outside')
  console.log(budgetIn)

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url)
    var payload = {
      'amazonUrl': url,
      'budget' : 123
    }
    console.log(payload)
    retrieveData(payload)
});
  // chrome.tabs.executeScript(null, {
  //   file: "getPagesSource.js"
  // }, function() {
  //   // If you try and inject into an extensions page or the webstore/NTP you'll get an error
  //   if (chrome.runtime.lastError) {
  //     message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
  //   }
  // });





// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));

});
