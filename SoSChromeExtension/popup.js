
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
console.log("Hello nick")
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

var url = 'http://127.0.0.1:5000/analyze';
var data = link;
let payload = {
  'amazonUrl': "link",
  'budget' : "budgetIn"
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
.then(res => console.log(res))
// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));

});
