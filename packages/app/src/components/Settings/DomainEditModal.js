import React from "react";

const DomainEditModal = ({
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
                        <h1 className="settings__heading">Edit Domain</h1>
                        <div className="settings__form">
                            <div className="settings__input-block">
                                <p className="settings__input-label">Domain:</p>
                                <span className="settings__input">
                                    <input
                                        value={domain.name}
                                        name="name"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="edit-button-div">
                            <button
                                className="edit-modal-button"
                                onClick={onSubmit}
                            >
                                Update
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

export default DomainEditModal;