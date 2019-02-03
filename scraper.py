from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
import requests
from bs4 import BeautifulSoup
import json
import sys
import logging
app.config['CORS_HEADERS'] = 'Content-Type'

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

response = {
	'alternative': {
		'qty': round(price/2),
		'name': 'coffees'
		},
	'stock': {
		'qty': round(price/31)
		},
	'mutual_fund': {
		'fv': price * (1.07 ** 20)
		}
}
response_json = json.dumps(response)

@app.route("/")
def pushData():
	return "The SOS Flask server is running"

@app.route('/analyze', methods=['POST'])
@cross_origin()
def Analyze():

	req = request.get_json()
	return json.dumps(req)
	
	if request.is_xhr:
		return "it is xhr"
	elif request.is_json:
		return "it is json"
	elif url is None:
		return "it is none"
	else:
		return "not none"
	# budget = request.form.get('budgetIn')
	#print("what Flask received: ", url, budget)
	# final_response = new Response()
	# return url
	return "analyze page"

if __name__ == "__main__":
	app.run()
