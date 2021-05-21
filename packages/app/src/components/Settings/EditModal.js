import React, { useEffect, useState } from 'react';

const EditModal = ({ show, handleClose, gc, errors, disableButton, handleChange }) => {

    const [grantCycle, setGrantCycle] = useState(gc);

    const showHideClassName = show ? "edit-modal edit-modal-display-block" : "edit-modal edit-modal-display-none";

    const disableDatePicker = (d) => {
        const today = new Date().setHours(0,0,0,0);
        const date = new Date(d).setHours(0,0,0,0);

        return today > date;
    }

    const getMinDate = () => {
        const today= new Date().toISOString().substr(0,10);
        console.log(today);
        return today;

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
                                    disabled={disableDatePicker(gc.openedOn)}
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
                                    min={getMinDate()}
                                    max="2100-01-01"
                                    
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
                    <button className="edit-modal-button" disabled={disableButton}>Edit</button>
                    <button className="edit-modal-button-cancel" onClick={handleClose}>Cancel</button>
                    <div className="edit-modal-errors">{ errors }</div>
                
                </> : null
                }
            </div>
        </div>
     );
}
 
export default EditModal;