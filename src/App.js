import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }
  
  componentDidMount() {
    console.log('mounted');
  }

  componentWillUnmount() {
    console.log('unmounted');
  }


  render() {
    console.log('hi');
    console.log(this.state.count);
    return (
      <div className="App" onClick={() => this.setState({count: this.state.count + 1})}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Js
          </a>
        </header>
      </div>
    );
  }
}

export default App;
