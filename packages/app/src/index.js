import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NominationShow from './components/nomination/nominationShow';

ReactDOM.render(
  <Router>
    <div className='container'>
      <React.StrictMode>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/nomination/:id" exact component={NominationShow} />
        </Switch>
      </React.StrictMode>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
