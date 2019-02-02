var jsondata ={};
var fs = require('fs');

var category = "Technology";
var url = "https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=" + category;

var request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(stock => {

      var obj = {
        name : stock.companyName,
        symbol : stock.symbol,
        price : stock.close
      };
      jsondata.push(obj);
      fs.writeFile ("input.json", JSON.stringify(jsondata), function(err) {
          if (err) throw err;
          console.log('complete');
          console.log(jsondata);
        };

    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}





request.send();
