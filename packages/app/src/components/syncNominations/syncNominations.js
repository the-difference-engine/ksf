import React, { useState } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import styles from './styles.css';

const SyncNominations = () => {
  const [message, setMessage] = useState('')

  const handleClick = () => {
    getSyncNom()
  }

  function removeMessage() {
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  function getSyncNom() {
    nominationsAPI.syncNominations()
    .then((res) => {
      if (res.status === 200) {
        setMessage('Nominations successfully synced')
        // do we need to distinguish whether there's new data coming in or not?
        window.location.reload()
      } else {
        setMessage('Error occurred while syncing')
        removeMessage()
      }
    })
  }

  return (
    <>
      <button onClick={handleClick} className='sync-noms'>Sync Nominations</button>
      {
        message ?
        <div>
          <h2>{message}</h2>
        </div>
        : null
      }
    </>

  )

}

export default SyncNominations