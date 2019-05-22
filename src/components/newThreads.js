import React from 'react';

export default class NewThreads extends React.Component {

  componentDidUpdate() {
    console.log('updated');
  }

  parsePosts = (subreddit) => {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    const { posts } = subreddits[subreddit];
  
    return posts.map(({ data }) => data);
  }
  
  // all { posts, seenIds,}
  
  markRead = (post) => {
    console.log(post);
    const {subreddit, id, num_comments: numComments} = post;
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    subreddits[subreddit].seenIds[id] = numComments;
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
  }
  
  markAllRead = () => {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    const subredditNames = Object.keys(subreddits);
  
    for (let subreddit of subredditNames) {
      subreddits[subreddit].posts.forEach( ({ data: { id } }) => subreddits[subreddit].seenIds[id] = true); 
      subreddits[subreddit].posts = [];
    }
  
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
    chrome.browserAction.setBadgeText({text: ""});
  }

  render() {
    // const posts = this.parsePosts('nfl');
    return (
      <div className="tab-body-container">
        New Thread Content!
        {this.parsePosts('nfl').map( (post) => <div style={{border: "1px solid red"}} onClick={() => this.markRead(post)}>{post.title} - {post.id} </div> )}
        <button onClick={this.markAllRead}>Mark All Read</button>
      </div>
    )
  }
}
