import React, {  } from 'react';

const NominationBanner = (props) => {


  return (
    <div className="nomination-banner">
      <div className="nomination-name">
        <p>Application <br></br> <span>lastname-state-abbrevation</span></p>
        <button>Edit</button>
      </div>
      <div className="nomination-overview">
        <p>HP Name <br></br> <span>{props.nomination.providerName}</span></p>
        <p>Family Member Name <br></br> <span>{props.nomination.representativeName}</span></p>
        <p>Created Date <br></br> <span>{props.nomination.createdAt}</span></p>
        <p>Grant Amount Requested <br></br> <span>{props.nomination.amountRequestedCents}</span></p>
      </div>
    </div>
  );
};

export default NominationBanner;
