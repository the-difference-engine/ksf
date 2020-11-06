import React, {  } from 'react';

const NominationBanner = (props) => {


  return (
    <div className="nomination-banner">
      <h1>application name: lastname-state-abbrevation</h1>
      <h1>{props.nomination.providerName}</h1>
      <h1>{props.nomination.representativeName}</h1>
      <h1>{props.nomination.createdAt}</h1>
      <h1>{props.nomination.amountRequestedCents}</h1>
      <button>edit</button>
    </div>
  );
};

export default NominationBanner;
