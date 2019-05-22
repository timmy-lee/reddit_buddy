import React from 'react';

export default class NewThreads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log('updated');
  }

  parsePosts = (subreddit) => {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    const { posts = [] } = subreddits[subreddit];

    return posts.map(({ data }) => data);
  }

  // all { posts, seenIds,}

  markRead = (post) => {
    console.log(post);
    const {subreddit, id, num_comments: numComments} = post;
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    subreddits[subreddit.toLowerCase()].posts = subreddits[subreddit.toLowerCase()].posts.filter( ({data: {id: postId}}) => postId !== id );
    subreddits[subreddit.toLowerCase()].seenIds[id] = numComments;
    localStorage.setItem('subreddits', JSON.stringify(subreddits));
    this.setState({});
  }

  markAllRead = () => {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    const subredditNames = Object.keys(subreddits);

    for (let subreddit of subredditNames) {
      subreddits[subreddit.toLowerCase()].posts.forEach( ({ data: { id } }) => subreddits[subreddit.toLowerCase()].seenIds[id] = true);
      subreddits[subreddit.toLowerCase()].posts = [];
    }

    localStorage.setItem('subreddits', JSON.stringify(subreddits));
    chrome.browserAction.setBadgeText({text: ""});
    this.setState({});
  }

  getSubreddits = () => {
    const subreddits = JSON.parse(localStorage.getItem('subreddits'));
    if (subreddits) {
      return Object.keys(subreddits);
    } else {
      return [];
    }
  }

  getPostsUnderSubreddit = (subreddit) => {
    const posts = this.parsePosts(subreddit);
    return (
      <div>
        {subreddit}
        {posts.map( (post) => <div style={{border: "1px solid red"}} onClick={() => this.markRead(post)}>{post.title} - {post.id} </div> )}
      </div>
    );
  }

  getContent = () => {
    const subreddits = this.getSubreddits();

    return (
      <div>
        {subreddits.map( (subreddit) => {
            this.getPostsUnderSubreddit(subreddit);
        })}
      </div>
    );
  }

  render() {
    // const subreddits = this.getSubreddits();
    console.log('render');
    
    return (
      <div className="tab-body-container">
        New Thread Content!
        {this.getContent()}
        {/* {this.parsePosts('nfl').map( (post) => <div style={{border: "1px solid red"}} onClick={() => this.markRead(post)}>{post.title} - {post.id} </div> )} */}
        <button onClick={this.markAllRead}>Mark All Read</button>
      </div>
    )
  }
}
