import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login/index';
import Home from './components/pages/Home/index';
import SearchResults from './components/SearchResultsCard';
import { NominationsDataProvider } from './utils/context/NominationsContext';
import { SearchResultDataProvider } from './utils/context/SearchResultsContext';
import SearchHealthProvider from './components/nominationInfo/healthProviderSearch/index';
import { ActiveNominationProvider } from './utils/context/ActiveNominationContext';
import NominationPage from './components/pages/NominationPage';
import VerifyEmail from './components/pages/VerifyEmail';
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
              <Route exact path={'/searchhealthprovider/:id'} component={SearchHealthProvider} />
              <Route exact path="/nomination/:id" component={NominationPage} />
              <Route exact path={['/', '/home']} component={Home} />
              <Route exact path={'/email-verification/:token'} component={VerifyEmail} />
              {/* <Route path={'*'} component={Home} /> */}
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
