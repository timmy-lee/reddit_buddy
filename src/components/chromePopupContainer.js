import React from 'react';
import NewThreads from './newThreads';
import Manage from './manage';
import Add from './add';
import Settings from './settings';
import '../stylesheets/chromePopupContainer.css';

export default class ChromePopupContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeTab: 'newThreads', subreddits: [] };
	}

<<<<<<< HEAD
  componentDidUpdate() {
    console.log('updated')
  };

  componentDidMount() {
    console.log('sup wit it');
  }

  componentWillUnmount() {
    console.log('bye bish');
  }

  render() {
    console.log('hi');
    const { activeTab } = this.state;
    return (
      <div className='chrome-popup-container'>
        <ul>
          <li
            onClick={() => this._navigateToTab('newThreads')}
            className={activeTab === 'newThreads' ? 'active' : ''}
          >
            New Threads
          </li>
          <li
            onClick={() => this._navigateToTab('manage')}
            className={activeTab === 'manage' ? 'active' : ''}
          >
           Manage Subscriptions
          </li>
          <li
            onClick={() => this._navigateToTab('add')}
            className={activeTab === 'add' ? 'active' : ''}
          >
            Add Subscriptions
          </li>
          <li
            onClick={() => this._navigateToTab('settings')}
            className={activeTab === 'settings' ? 'active' : ''}
          >
            Settings
          </li>
        </ul>
        {this._getTabBody()}
      </div>
    );
  }
=======
	render() {
		const { activeTab } = this.state;
		return (
			<div className="chrome-popup-container">
				<ul>
					<li
						onClick={() => this._navigateToTab('newThreads')}
						className={activeTab === 'newThreads' ? 'active' : ''}
					>
						New Threads
					</li>
					<li
						onClick={() => this._navigateToTab('manage')}
						className={activeTab === 'manage' ? 'active' : ''}
					>
						Manage Subscriptions
					</li>
					<li
						onClick={() => this._navigateToTab('add')}
						className={activeTab === 'add' ? 'active' : ''}
					>
						Add Subscriptions
					</li>
					<li
						onClick={() => this._navigateToTab('settings')}
						className={activeTab === 'settings' ? 'active' : ''}
					>
						Settings
					</li>
				</ul>
				{this._getTabBody()}
			</div>
		);
	}
>>>>>>> 1ab966a67a2b676d1393f8a0c62228ff7ab43d22

	_navigateToTab = data => {
		this.setState({ activeTab: data });
	};

	_getTabBody = () => {
		const { activeTab } = this.state;

		switch (activeTab) {
			case 'newThreads':
				return <NewThreads />;
			case 'manage':
				return <Manage />;
			case 'add':
				return <Add />;
			case 'settings':
				return <Settings />;
			default:
				return null;
		}
	};
}
