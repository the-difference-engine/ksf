import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import FamilyMemberInfo from './components/familyInformation/familyInformation';
import HealthProvider from "./components/healthProvider/healthProvider";
import Login from './components/pages/Login/index';
import Home from './components/pages/Home/index';
import { NominationsDataProvider } from './utils/context/NominationsContext';

import health_info from "./components/healthProvider/dummyData";
import family_info from './components/familyInformation/dummyData';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <NominationsDataProvider>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/login'} component={Login} />
          <Route path="/applicationdetails">
            <div style={{ margin: '0 auto', backgroundColor: 'grey', padding: '2em'}}>
              <FamilyMemberInfo {...family_info} />
            </div>
            <div style={{ margin: "0 auto", backgroundColor: 'grey', padding: '2em'}}>
              <HealthProvider {...health_info} />
            </div>
          </Route>
        </NominationsDataProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
