import React from 'react';

const ResendEmailBtn = (props) => {

  return (
      <button
      disabled={
        props.status === 'Declined' ||
        props.status === 'received'
      }
      className="resend-email-btn banner-buttons"
      onClick={props.toggleEmailModalState}
    >
      Resend Email
    </button>
  )
}

export default ResendEmailBtn;
