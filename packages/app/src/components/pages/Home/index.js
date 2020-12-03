import React from 'react';
import SearchBar from '../../SearchBar';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import nominationShow from '../../nomination/nominationShow';
import ApplicationPage from '../../pages/NominationPage/index';
import { Link, Route } from 'react-router-dom';

const home = (props) => {
  return (
    <>
      <SearchBar />
      <Route exact path={`/nomination/:id`} component={ApplicationPage} />
    </>
  );
};

export default home;
