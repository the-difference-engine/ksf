import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NominationShow from './components/nomination/nominationShow';
import Login from './components/pages/Login/index';
import Home from './components/pages/Home/index';
import SearchResults from './components/SearchResultsCard';
import { NominationsDataProvider } from './utils/context/NominationsContext';
import { SearchResultDataProvider } from './utils/context/SearchResultsContext';
import './App.css';


ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <NominationsDataProvider>
          <SearchResultDataProvider>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/searchresults'} component={SearchResults} />
            <Route path="/nomination/:id" exact component={NominationShow} />
          </SearchResultDataProvider>
        </NominationsDataProvider>
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
