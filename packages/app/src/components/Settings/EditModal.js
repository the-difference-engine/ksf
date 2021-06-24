import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const EditModal = ({ show, handleClose, gc, errors, disableButton, handleChange, onSubmit }) => {

    const showHideClassName = show ? "edit-modal edit-modal-display-block" : "edit-modal edit-modal-display-none";

    const disableDatePicker = (d) => {
        // return moment().isAfter(moment(d));
        const now = DateTime.now()

        return now > d;
    }

    const getMinDate = () => {
        // return moment().format('YYYY-MM-DD');
        return DateTime.now().toISODate();
    }

    return ( 
        <div className={ showHideClassName }>
            <div className="edit-modal-main">
                {gc ?
                <>
                    <h1 className="settings__heading">Edit Cycle</h1>
                    <div className="settings__form">
                        <div className="settings__input-block">
                            <p className="settings__input-label">Start Date:</p>
                            <span className="settings__input">
                                <input
                                    value={gc.openedOn}
                                    name="openedOn"
                                    onChange={handleChange}
                                    type="date"
                                />
                            </span>
                        </div>
                        <div className="settings__input-block">
                            <p className="settings__input-label">End Date:</p>
                            <span className="settings__input">
                                <input
                                    value={gc.closedOn}
                                    name="closedOn"
                                    onChange={handleChange}
                                    type="date"
                                    
                                />
                            </span>
                        </div>
                        <div className="settings__input-block">
                            <p className="settings__input-label">Name:</p>
                            <span className="settings__input">
                                <input
                                    value={gc.name}
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </span>
                        </div>
                    </div>
                    <button className="edit-modal-button" onClick={onSubmit} disabled={disableButton}>Update</button>
                    <button className="edit-modal-button-cancel" onClick={handleClose}>Cancel</button>
                    <div className="edit-modal-errors">{ errors }</div>
                
                </> : null
                }
            </div>
        </div>
     );
}
 
export default EditModal;