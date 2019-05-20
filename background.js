console.log("Hello Christian");

chrome.runtime.onInstalled.addListener(async () => {
  const response = await fetch('https://reddit.com/r/cscareerquestions.json');
  const parsedResponse = await response.text();
  console.log('parsedResponse=', parsedResponse);
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ 'url': 'chrome://newtab' });
});

// chrome.browserAction.setPopup(() => {
//
// });
