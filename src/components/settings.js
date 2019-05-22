import React from 'react';
import '../stylesheets/settings.css';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const settings = JSON.parse(localStorage.getItem('settings'));
		const interval = settings && parseInt(settings.pollingInterval);
		interval && this.setState({ pollingInterval: interval });
	}

	render() {
		const { pollingInterval, showMessage } = this.state;

		return (
			<div id="settings-page" className="tab-body-container">
				<h2>Settings:</h2>
				<div className="notification-select">
					<label>
						Notification Interval
						<select className="select-dropdown" onChange={this._onChange}>
							<option value="-1" selected={!pollingInterval}>
								Off
							</option>
							<option value="60" selected={pollingInterval === 60}>
								1 Minute
							</option>
							<option value="300" selected={pollingInterval === 300}>
								5 Minutes
							</option>
							<option value="600" selected={pollingInterval === 600}>
								10 Minutes
							</option>
							<option value="1800" selected={pollingInterval === 1800}>
								30 Minutes
							</option>
						</select>
					</label>
				</div>
				{showMessage && <p className="success-message">Your changes are successfully saved</p>}
				<span role="img" id="giant-emoji">
					😻
				</span>
			</div>
		);
	}

	_onChange = e => {
		const currentSettings = JSON.parse(localStorage.getItem('settings')) || {};
		currentSettings.pollingInterval = e.target.value;
		localStorage.setItem('settings', JSON.stringify(currentSettings));
		this._successChanged();
	};

	_successChanged = () => {
		this.setState({ showMessage: true });
		setTimeout(() => {
			this.setState({ showMessage: false });
		}, 5000);
	};
}
