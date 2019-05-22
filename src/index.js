import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChromePopupContainer from './components/ChromePopupContainer';
import * as serviceWorker from './serviceWorker';

window.addEventListener('storage', () => ReactDOM.render(<ChromePopupContainer />, document.getElementById('root')));

ReactDOM.render(<ChromePopupContainer />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
