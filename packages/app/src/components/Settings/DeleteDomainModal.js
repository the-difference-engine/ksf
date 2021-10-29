import React from "react";

const DeleteDomainModal = ({
    show,
    handleClose,
    domain,
    handleChange,
    onSubmit,
}) => {
    const showHideClassName = show
        ? 'edit-modal edit-modal-display-block'
        : 'edit-modal edit-modal-display-none';

    return (
        <div className={showHideClassName}>
            <div className="edit-modal-main">
                {domain ? (
                    <>
                        <h1 className="settings__heading">Delete Domain</h1>
                        <div className="settings__form">
                            <div className="settings__input-block">
                                <p className="settings__input-label">
                                    Are you sure you want to delete?
                                </p>
                            </div>
                        </div>
                        <div className="edit-button-div">
                            <button
                                className="edit-modal-button"
                                onClick={onSubmit(domain.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="edit-modal-button-cancel"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default DeleteDomainModal;