import React, { useEffect, useState } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import styles from './styles.css';
import { findAllNominations } from '../../utils/context/NominationsContext'

const SyncNominations = () => {
  const [message, setMessage] = useState('')
  // const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  const handleClick = () => {
    getSyncNom()
  }

  // useEffect(() => {

  // })

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
        removeMessage()
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