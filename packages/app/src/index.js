import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login/index';
import Home from './components/pages/Home/index';
import SearchResults from './components/SearchResultsCard';
import { NominationsDataProvider } from './utils/context/NominationsContext';
import { SearchResultDataProvider } from './utils/context/SearchResultsContext';
import { ActiveNominationProvider } from './utils/context/ActiveNominationContext';
import NominationsPage from './components/pages/NominationPage';
import './App.css';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <NominationsDataProvider>
          <SearchResultDataProvider>
            <ActiveNominationProvider>
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/searchresults'} component={SearchResults} />
              <Route exact path="/nomination/:id" component={NominationsPage} />
              <Route exact path={['/', '/home']} component={Home} />
              {/* <Route component={Home} /> */}
              {/* redirect nonavailable urls to home component */}
            </ActiveNominationProvider>
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
