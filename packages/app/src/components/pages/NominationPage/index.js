import React from 'react';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import NominationShow from '../../nomination/nominationShow';

const nominationsPage = (props) => {
  return (
    <>
      <ApplicationStages />
      <NominationShow {...props} />
      {console.log(props.match.url, "********************")}
    </>
  );
};

export default nominationsPage;