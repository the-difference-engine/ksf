import React from 'react';
const HandleAttachmentBtn = (props) => {

  return (
    <button
      className="decline-button banner-buttons"
      onClick={props.toggleHandleAttachmentModalState}
    >
      Handle Attachment
    </button>
  );
};
export default HandleAttachmentBtn;
