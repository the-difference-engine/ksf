import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NominationShow from './components/nomination/nominationShow';
import FamilyMemberInfo from './components/familyInformation/familyInformation';
import HealthProvider from './components/healthProvider/healthProvider';
import Login from './components/pages/Login/index';
import Home from './components/pages/Home/index';
import { NominationsDataProvider } from './utils/context/NominationsContext';

import './App.css';

import provider_info from './components/healthProvider/dummyData';
import family_info from './components/familyInformation/dummyData';
const dummyStyle = {
  margin: '0 auto',
  backgroundColor: 'var(--light-background)',
  padding: '2em',
}

ReactDOM.render(
  <Router>
    <div className="container">
      <React.StrictMode>
        <Switch>
          <NominationsDataProvider>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />
            <Route path="/nomination/:id" exact component={NominationShow} />
            <Route path="/applicationdetails">
              <div style={dummyStyle}>
                <FamilyMemberInfo {...family_info} />
              </div>
              <div style={dummyStyle}>
                <HealthProvider {...provider_info} />
              </div>
            </Route>
          </NominationsDataProvider>
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
