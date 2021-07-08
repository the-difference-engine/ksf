import style from './style.css'
import React, { useState } from 'react'

const [modalState, setModalState] = useState(false);
const toggleModalState = () => {
    setModalState(!modalState)
}


const declineNominationModal = () => {
    return(
        <div className={`modal-background isModalShowing-${modalState}`}>
            <div className="decline-confirmation-modal">
                <p>Do you want to decline the application?</p>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
    );
}
    
export default declineNominationModal;