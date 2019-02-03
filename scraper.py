from flask import Flask
app = Flask(__name__)
import requests
from bs4 import BeautifulSoup
import json

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch, br",
    "Accept-Language": "en-US,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
}
address = "https://www.amazon.ca/dp/B0792JYXZK/"
page = requests.get(address, headers=headers)

soup = BeautifulSoup(page.text, 'html.parser')
price_box = soup.find('span', attrs={'class':'a-size-medium a-color-price'})
price_str = price_box.text
price = float(price_str[price_str.find(' ') + 1:])

item_dict = {
	'price':price,
	'coffees': 
			}
item_json = json.dumps(item_dict)

response = {
	'alternative': {
		'qty': round(price/2),
		'name': 'coffees'
		},
	'stock': {
		'qty': round(price/31)

		}
	'mutual_fund': {
		'fv': price * (1.07 ** 20)
		}
	''


}

@app.route("/")
def pushData():
	return "The SOS Flask server is running"

@app.route('/analyze', methods=['GET', 'POST'])
def Analyze():
	return request.form['amazon_url']

if __name__ == "__main__":
	app.run()
