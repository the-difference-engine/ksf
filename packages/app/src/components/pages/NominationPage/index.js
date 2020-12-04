import React from 'react';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import NominationShow from '../../nomination/nominationShow';

const nominationsPage = (props) => {
  return (
    <>
      <NominationShow {...props} />
      <ApplicationStages />
    </>
  );
};

export default nominationsPage;