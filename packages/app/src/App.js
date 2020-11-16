import React from 'react';
import './App.css';
import FamilyMemberInfo from './components/familyInformation/familyInformation';
import family_info from './components/familyInformation/dummyData';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Login from './components/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/applicationdetails">
          <div
            style={{
              margin: '0 auto',
              backgroundColor: 'grey',
              padding: '2em',
            }}
          >
            <FamilyMemberInfo {...family_info} />
          </div>
        </Route>
        <Route exact path={'/login'} component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
