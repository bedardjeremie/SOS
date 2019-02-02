chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'www.amazon.ca',schemes: ['https']},
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'www.amazon.com', schemes: ['https']},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
});

// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBedebzp0C-7nrai2l2qXJNA8-qmRYngec",
  authDomain: "soschromeextension.firebaseapp.com",
  databaseURL: "https://soschromeextension.firebaseio.com",
  projectId: "soschromeextension",
  storageBucket: "soschromeextension.appspot.com",
  messagingSenderId: "586777681022"
};
firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
}
