chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: ['#3aa757','#54a6ff','#fd2a4a','#fef65b']}, function() {
    console.log("The color is green.");
  });
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
