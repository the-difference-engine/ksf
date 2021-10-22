import React from 'react';
const HandleAttachmentModal = (props) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="exit-button"
          onClick={props.toggleHandleAttachmentModalState}
        >
          &times;
        </button>
        <h3 className="modal-text">
          Have you verified the attachment for this application?
        </h3>
        <div className="modal-buttons">
          <button
            className="button-yes"
            onClick={() => {
              props.attachmentsHandled();
              props.toggleHandleAttachmentModalState();
            }}
          >
            Confirm
          </button>
          <button
            className="button-no"
            onClick={props.toggleHandleAttachmentModalState}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default HandleAttachmentModal;
