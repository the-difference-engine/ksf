import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

const MarkStageAsCompleteModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    function openModal() {
      setIsOpen(true);
    };

    function closeModal() {
      setIsOpen(false);
    }   

    return (
      <div>
        <button className='button next' onClick={openModal}>Do you want to mark stage as complete?</button>
        <Modal
            style={customStyles}
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
        >
        <button className='button next'>Yes</button>
        <button className='decline-button' onClick={closeModal}>No</button>
        </Modal>
      </div>
    );
}
export default MarkStageAsCompleteModal
