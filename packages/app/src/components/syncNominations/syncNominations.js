import React from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import styles from './styles.css';
import NominationsDataProvider from '../../utils/context/NominationsContext'

const SyncNominations = () => {

  const handleClick = () => {
    nominationsAPI.syncNominations()
  }

  return (
    <button onClick={handleClick} className='sync-noms'>Sync Nominations</button>
  )

}

export default SyncNominations