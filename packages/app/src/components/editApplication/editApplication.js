import React, { useState } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import styles from './styles.css';

const EditApplication = () => {
  const [message, setMessage] = useState('')

  const handleClick = () => {
    getSyncNom()
  }

  return (
    <>
      <button onClick={handleClick} className='sync-noms'>Sync Nominations</button>
      {
        message &&
        <div>
          <h2 className='sync-message'>{message}</h2>
        </div>
      }
    </>

  )

}

export default EditApplication