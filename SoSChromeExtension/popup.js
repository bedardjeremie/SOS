
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

let link;
let budgetIn;

let stockGrowthTen = function(price){
  let arr = [];
  let growPrice = 0;
  arr.push(price)
  for(var year = 1; year < 10; year++){
    growPrice = arr[year-1] * 1.07;
    arr.push(growPrice);
  }
  return arr;
}
let rawPrices = stockGrowthTen(50);
console.log(rawPrices)
var ctx = document.getElementById("compoundChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10],
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
                    beginAtZero:false
                }
            }]
        }
    }
});
chrome.runtime.onMessage.addListener(function(request, sender) {
  message.innerText = sender.tab.url;
  link = sender.tab.url;
});

$( document ).ready(function() {
  let budgetText = $('#budget-text');
  // let message = $('#message');
  chrome.storage.sync.get('budget', function(data){
    let budgetAmt = data.budget.toString();
    budgetIn = data.budget.toString();
    budgetText.append(budgetAmt);
  })

  // chrome.tabs.executeScript(null, {
  //   file: "getPagesSource.js"
  // }, function() {
  //   // If you try and inject into an extensions page or the webstore/NTP you'll get an error
  //   if (chrome.runtime.lastError) {
  //     message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
  //   }
  // });

const url = 'http://127.0.0.1:5000/analyze';

let payload = {
  'amazonUrl': link,
  'budget' : budgetIn
}

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
  let finalTextOppCost = "With this cash you could buy " + res.alternative.qty.toString() + " " + res.alternative.name + "!"
  console.log(finalTextOppCost);
  oppcost.innerHTML = finalTextOppCost;
})
// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));

});
