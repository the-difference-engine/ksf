import React from 'react';

const DeclineAppBtn = (props) => {
  return (
    <button
      disabled={props.status === 'Declined'}
      className="decline-button banner-buttons"
      onClick={props.toggleDeclineAppModalState}
    >
      Decline Application
    </button>
  );
};

export default DeclineAppBtn;
