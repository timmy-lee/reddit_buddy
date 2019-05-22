import React from 'react';
import NewThreads from './newThreads';
import Manage from './manage';
import Add from './add';
import Settings from './settings';
import '../stylesheets/chromePopupContainer.css';

export default class ChromePopupContainer extends React.Component {
  constructor(props) {
    super(props);
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    this.state = { activeTab: 'newThreads', subreddits: [], isDarkMode: !!settings.isDarkMode };
  }

  render() {
    const { activeTab, isDarkMode } = this.state;
    console.log('isDarkMode =', isDarkMode);

    const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

    return (
      <div className={`chrome-popup-container ${modeClass}`}>
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

  _navigateToTab = data => {
    this.setState({ activeTab: data });
  };

  _getTabBody = () => {
    const { activeTab, isDarkMode } = this.state;

    switch (activeTab) {
      case 'newThreads':
        return <NewThreads isDarkMode={isDarkMode} />;
      case 'manage':
        return <Manage />;
      case 'add':
        return <Add />;
      case 'settings':
        return <Settings updateDarkMode={this.updateDarkMode} />;
      default:
        return null;
    }
  };

  updateDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode })
  }
}
