import React from 'react';
import '../stylesheets/settings.css';

export default class Settings extends React.Component {
  render() {
    return (
      <div id="settings-page" className="tab-body-container">
        <div className="notification-select">
          <label>Notification Interval
            <select className="select-dropdown" onChange={this._onChange}>
              <option value="-1">Off</option>
              <option value="60">1 Minute</option>
              <option value="300">5 Minutes</option>
              <option value="600">10 Minutes</option>
              <option value="1800">30 Minutes</option>
            </select>
          </label>
        </div>
      </div>
    );
  }

  _onChange = (e) => {
    console.log('e =', e.target.value);
  }
}
