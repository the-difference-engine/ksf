import React, { useState } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import styles from './styles.css';

const CheckNominations = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    getCheckedNoms();
  };


  function getCheckedNoms() {
    nominationsAPI.checkNominations().then((res) => {
      if (res.status === 200) {
        let url = res.data.authorizeUrl;
        window.open(url, "_blank", 'noopener,noreferrer')
      } else {
        setMessage('Error occurred, Dashboard update failed...');
      }
    });
  }
  return (
    <>
      <button onClick={handleClick} className="check-noms">
        Check For Documents
      </button>

      {message && (
        <div>
          <h2 className="check-message">{message} </h2>
        </div>
      )}
    </>
  );
};

export default CheckNominations;
