let changeColorGreen = document.getElementById('changeColorGreen');
let changeColorRed = document.getElementById('changeColorRed');
let changeColorBlue = document.getElementById('changeColorBlue');

let changeColorYellow = document.getElementById('changeColorYellow');

let colorGrid = [changeColorGreen, changeColorBlue, changeColorRed, changeColorYellow]
function onClick(element){
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
}

chrome.storage.sync.get('color', function(data) {
  for(var i = 0; i < colorGrid.length; i++){
    colorGrid[i].style.backgroundColor = data.color[i];
    colorGrid[i].setAttribute('value', data.color[i]);
    colorGrid[i].onclick = onClick
  }
});
