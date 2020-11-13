import React from "react";
import GoogleBtn from "./components/GoogleBtn/GoogleBtn";
import "./App.css";
import FamilyMemberInfo from "./components/familyInformation/familyInformation";
import family_info from "./components/familyInformation/dummyData";
import {Route, BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/applicationdetails'>
          <div style={{ margin: "0 auto", backgroundColor: 'grey', padding: '2em'}}>
            <FamilyMemberInfo {...family_info} />
          </div>
        </Route>
        <Route path='/'>
          <div className='App'>
            <GoogleBtn />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
