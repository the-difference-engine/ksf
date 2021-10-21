import React from 'react';

const DeclineAppModal = (props) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="exit-button"
          onClick={props.toggleDeclineAppModalState}
        >
          &times;
        </button>
        <h3 className="modal-text">
          Are you sure you want to decline the application?
        </h3>
        <div className="modal-buttons">
          <button
            className="button-yes"
            onClick={() => {
              props.declineApplication();
              props.toggleDeclineAppModalState();
            }}
          >
            Confirm
          </button>
          <button
            className="button-no"
            onClick={props.toggleDeclineAppModalState}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclineAppModal;
