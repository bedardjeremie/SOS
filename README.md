SOS - Stop OverSpending

Amazon's one-click checkout makes impulse buying online so easy. With all the money we waste on regrettable Amazon purchases, we can spend on many more useful items or invest for our futures! Our Chrome extension, Stop OverSpending, gives you perspective on the magnitude of your possible purchase. Based on the price of the product that you're looking at, it shows the number of other products that you can buy for comparison purposes, and how much money you would have in the future if you invested in our affiliated bank's mutual funds. It also provides an easy link to guide you to contributing to your Tax-Free Savings Account. So come along, and start saving!

The UI of the extension was made with vanilla HTML, CSS and JS. The backend is written in Python using Flask. The front-end interface transmits the page url to the server, which launches a crawler that finds the price of the item that is being looked at. Then, the python script on the server performs various calculations and returns the results back to the front end to be displayed to the user. The extension will only perform its analysis on Amazon product pages.

To set up the environment:
1. In your SOS folder, run command: pip install virtualenv
2. run command: pip install virtualenvwrapper-win
3. run command: mkvirtualenv sos
4. Still in your SOS folder, run command: setprojectdir
5. run command: pip install flask

Good job!

If you ever want to leave the development environment, run command: deactivate
If you want to start to boot the development environment again, run command: workon <name of environment> 
(i.e: workon sos)
