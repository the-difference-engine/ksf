import React from 'react';
const HandleAttachmentBtn = (props) => {

  return (
    <button
      className="decline-button banner-buttons"
      onClick={props.toggleHandleAttachmentModalState}
    >
      Verify Attachment(s)
    </button>
  );
};
export default HandleAttachmentBtn;
