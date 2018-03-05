import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import Article from './Article';

class App extends React.Component {
  render() {
    return <Article/>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
