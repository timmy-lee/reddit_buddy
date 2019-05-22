// import { getConsoleOutput } from "@jest/console";

console.log('Hello Christian');

chrome.runtime.onInstalled.addListener(async () => {
	const response = await fetch('https://reddit.com/r/cscareerquestions.json');
	const parsedResponse = await response.text();
	console.log('parsedResponse=', parsedResponse);
});

chrome.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({ url: 'chrome://newtab' });
});

// chrome.browserAction.setPopup(() => {
//
// });
const createURL = subreddit => `https://www.reddit.com/r/${subreddit}.json`;

function getPosts(subreddit) {
	fetch(createURL(subreddit))
		.then(res => {
			if (res.status !== 200) {
				throw res;
			} else {
				return res.json();
			}
		})
		.then(({ data: { children: posts } }) => setPosts(subreddit, posts));
}

function setPosts(subreddit, posts) {
  posts = posts.filter( ({data}) => checkNotRead(data));
  if (posts.length > 0) {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    subreddits[subreddit].posts = posts;
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
    console.log(posts);
    chrome.browserAction.setBadgeText({text: "+"});
  }
}

function parsePosts(subreddit) {
	const subreddits = JSON.parse(localStorage.getItem('subreddits'));
	const { posts } = subreddits[subreddit];

	return posts.map(({ data }) => data);
}

// all { posts, seenIds,}

function markRead(post) {
  const {subreddit, id, num_comments: numComments} = post;
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  subreddits[subreddit.toLowerCase()].seenIds[id] = numComments;
  localStorage.setItem('subreddits', JSON.stringify(subreddits));
}

function markAllRead() {
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  const subredditNames = Object.keys(subreddits);

  for (let subreddit of subredditNames) {
    subreddits[subreddit].posts.forEach( ({ data: { id } }) => subreddits[subreddit].seenIds[id] = true); 
    subreddits[subreddit].posts = [];
  }

  localStorage.setItem('subreddits', JSON.stringify(subreddits));
  chrome.browserAction.setBadgeText({text: ""});
}

function checkNotRead(post) {
  const { subreddit, id } = post;
  console.log(post);
  const subreddits = JSON.parse(localStorage.getItem('subreddits'));
  console.log(subreddits);

	if (subreddits[subreddit.toLowerCase()].seenIds[id]) {
		return false;
	} else {
		return true;
	}
}

//{ subreddits: { subreddit: { posts : [], seenIds: {} }}}

function addSubreddit(subreddit) {
	const subreddits = JSON.parse(localStorage.getItem('subreddits')) || {};
	subreddits[subreddit] = { posts: [], seenIds: {} };
	localStorage.setItem('subreddits', JSON.stringify(subreddits));
	// const subredditNames = Object.keys(subreddits);
}

function deleteSubreddit(subreddit) {
	const subreddits = JSON.parse(localStorage.getItem('subreddits'));
	delete subreddits[subreddit];
	localStorage.setItem('subreddits', JSON.stringify(subreddits));
}

function getSubreddits() {
	const subreddits = JSON.parse(localStorage.getItem('subreddits'));
	if (subreddits) {
		return Object.keys(subreddits);
	} else {
		return [];
	}
}

chrome.alarms.create("fetch-subreddit-posts", {
  periodInMinutes: 0.3,
  // when: Date.now() + 1000,
});

chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name === 'fetch-subreddit-posts') {
		const subreddits = getSubreddits();
		for (let subreddit of subreddits) {
			getPosts(subreddit);
		}
	}
});

chrome.browserAction.setBadgeBackgroundColor({color: 'orange'});

chrome.browserAction.onClicked.addListener(function() {
  chrome.browserAction.setBadgeText({text: ""});
});
// chrome.runtime.onStartup.addListener(() => console.log('startup'));

// chrome.runtime.onSuspend.addListener(() => console.log('bye'));
