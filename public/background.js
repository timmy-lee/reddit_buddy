// import { getConsoleOutput } from "@jest/console";

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
const createURL = (subreddit) =>  `https://www.reddit.com/r/${subreddit}.json`;

function getPosts(subreddit) {
	fetch(createURL(subreddit)).
		then( res => {
			if (res.status !== 200) {
				throw res
			} else {
				return res.json();
			}
			}).
		then( ({ data: {children: posts} }) => setPosts(subreddit, posts));
}

function setPosts(subreddit, posts) {
  posts = posts.filter( ({data}) => checkRead(data));
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  subreddits[subreddit] = posts;
  localStorage.setItem('subreddits', JSON.stringify(subreddits));
  console.log(posts);
}

function checkRead(post) {
  const {subreddit, id} = post;
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));

  if (subreddits[subreddit][id]) {
    return true;
  } else {
    return false;
  }
}

function addSubreddit(subreddit) {
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  subreddits[subreddit] = true;
  localStorage.setItem('subreddits', JSON.stringify(subreddits));
  // const subredditNames = Object.keys(subreddits);
}

function deleteSubreddit(subreddit) {
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  delete subreddits[subreddit];
  localStorage.setItem('subreddits', JSON.stringify(subreddits));
}

function getSubs() {
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  if (subreddits) {
    return Object.keys(subreddits);    
  } else {
    return [];
  }
}

chrome.alarms.create("fetch-subreddit-posts", {
  periodInMinutes: 0.5,
  // when: Date.now() + 1000,
});

chrome.alarms.onAlarm.addListener(function(alarm){
  if(alarm.name==="fetch-subreddit-posts"){
    const subreddits = getSubs();
    for (let subreddit of subreddits) {
      getPosts(subreddit);
    }
  }
});
// chrome.runtime.onStartup.addListener(() => console.log('startup'));

// chrome.runtime.onSuspend.addListener(() => console.log('bye'));