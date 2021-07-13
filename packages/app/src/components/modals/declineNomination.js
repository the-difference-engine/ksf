import style from './style.css'
import React, { useState } from 'react'



const DeclineNominationModal = () => {

    const [modalState, setModalState] = useState(false);
    const toggleModalState = () => {
        setModalState(!modalState)
    }

    return(
        <div className={`modal-background isModalShowing-${modalState}`}>
            <div className="decline-confirmation-modal">
                <p>Do you want to decline the application?</p>
                <button>Yes</button>
                <button onClick={()=>{toggleModalState()}} >No</button>
                <button onClick={()=>{toggleModalState()}} >X</button>
            </div>
        </div>
    );
}
    
export default DeclineNominationModal;