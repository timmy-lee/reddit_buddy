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
		const subredditsArray = [];
		for (let key in subreddits) {
			subredditsArray.push({
				name: key,
				type: subreddits[key].type,
			});
		}
		if (subreddits) {
			this.setState({ subreddits: subredditsArray });
		}
	};

	deleteSubreddit = subredditName => {
		const subreddits = JSON.parse(localStorage.getItem('subreddits'));
		delete subreddits[subredditName];
		localStorage.setItem('subreddits', JSON.stringify(subreddits));
		const subredditsArray = [];
		for (let key in subreddits) {
			subredditsArray.push({
				name: key,
				type: subreddits[key].type,
			});
		}
		this.setState({ subreddits: subredditsArray });
	};

	saveChanges = (name, type) => {
		const subreddits = JSON.parse(localStorage.getItem('subreddits'));
		subreddits[name].type = type;
		localStorage.setItem('subreddits', JSON.stringify(subreddits));
		const subredditsArray = [];
		for (let key in subreddits) {
			subredditsArray.push({
				name: key,
				type: subreddits[key].type,
			});
		}
		this.setState({ subreddits: subredditsArray });
	};

	render() {
		const subreddits = this.state.subreddits;
		return (
			<div className="tab-body-container">
				<h3>
					my subscriptions <span role="img">💍🙊🐠🍓</span>
				</h3>
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
				<p id="rajesh">i love rajesh with all my heart he is the best engineering lead ever</p>
			</div>
		);
	}
}
