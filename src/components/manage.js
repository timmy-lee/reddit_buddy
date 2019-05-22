import React from 'react';
import '../stylesheets/manage.css';
import ListItem from './listItem';

export default class Manage extends React.Component {
	state = {
		subreddits: [],
	};

	componentDidMount() {
		this.grabSubreddits();
	}

	grabSubreddits = () => {
		const subreddits = JSON.parse(localStorage.getItem('subreddits'));
		if (subreddits) {
			this.setState({ subreddits });
		}
	};

	deleteSubreddit = subredditName => {
		const subreddits = JSON.parse(localStorage.getItem('subreddits'));
		const updatedSubreddits = subreddits.filter(subreddit => subreddit.name !== subredditName);
		localStorage.setItem('subreddits', JSON.stringify(updatedSubreddits));
		this.setState({ subreddits: updatedSubreddits });
	};

	saveChanges = (name, type) => {
		const subreddits = JSON.parse(localStorage.getItem('subreddits'));
		const foundIndex = subreddits.findIndex(subreddit => subreddit.name === name);
		console.log('type is', type, 'found is', subreddits[foundIndex]);
		subreddits[foundIndex]['type'] = type;
		console.log('called here?', subreddits);
		localStorage.setItem('subreddits', JSON.stringify(subreddits));
		this.setState({ subreddits });
	};

	render() {
		const subreddits = this.state.subreddits;
		console.log('boop', subreddits);
		return (
			<div className="tab-body-container">
				<h3>my subscriptions</h3>
				<ul>
					{subreddits.map(subreddit => (
						<ListItem
							name={subreddit.name}
							deleteSubreddit={this.deleteSubreddit}
							saveChanges={this.saveChanges}
							type={subreddit.type}
						/>
					))}
				</ul>
			</div>
		);
	}
}
