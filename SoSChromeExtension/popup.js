let changeColorGreen = document.getElementById('changeColorGreen');

// function onClick(element){
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// }


$( document ).ready(function() {
  let budgetText = $('#budget-text');
  chrome.storage.sync.get('budget', function(data){
    let budgetAmt = data.budget.toString();
    budgetText.append(budgetAmt);
  })
});
