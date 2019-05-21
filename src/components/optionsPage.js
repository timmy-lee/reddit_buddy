import React from 'react';
import ReactDOM from 'react-dom';

export default function OptionsPage() {
  return (
    <div>Christian is the best</div>
  );
}

const app = document.createElement('div');
app.id = 'extension-options';

document.body.appendChild(app);
ReactDOM.render(<OptionsPage />, app)
