
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
var link;
var budgetIn;

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

///// below is to post the url
var url = 'http://127.0.0.1:5000/analyze';
var data = link;

fetch(url, {
  method: 'POST', // or 'PUT'
  body: {'amazonUrl': link, 'budget' : budgetIn}, // data can be `string` or {object}!
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));


});
