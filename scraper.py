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

def scrape(url, budget):	
	headers = {
	    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	    "Accept-Encoding": "gzip, deflate, sdch, br",
	    "Accept-Language": "en-US,en;q=0.8",
	    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
	}
	page = requests.get(url, headers=headers)

	soup = BeautifulSoup(page.text, 'html.parser')
	price_box = soup.find('span', attrs={'class':'a-size-medium a-color-price'})
	price_str = price_box.text
	price_2 = price_str[price_str.find("$") + 2:]
	price_3 = price_2[:price_2.find("\n")]
	price = float(price_3)

	graph_data = []
	pv = price
	for i in range(21):
		graph_data.append(round(pv))
		pv = pv * 1.07
	
	if price < budget:
		budget_check = "This item is within your budget."
	else:
		budget_check = "This item is above your budget."

	response = {
		'budget': budget_check,
		'alternative': {
			'qty': round(price/2),
			'name': 'coffees'
			},
		'stock': {
			'qty': round(price/12.59),
			'name': "Aphria (APHA)"
			},
		'mutual_fund': {
			'fv': price * (1.07 ** 20),
			'graph': graph_data
			}
	}
	
	response_json = json.dumps(response)
	return response_json

@app.route("/")
def pushData():
	return "The SOS Flask server is running"

@app.route('/analyze', methods=['POST'])
@cross_origin()
def Analyze():

	req = request.get_json()
	return scrape(req['amazonUrl'], req['budget'])

if __name__ == "__main__":
	app.run()
