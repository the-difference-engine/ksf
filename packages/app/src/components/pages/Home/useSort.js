import React, { useState, useMemo, useContext } from 'react'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const useSort = (nominations, config = null) => {
  const [sortConfig, setSortConfig] = useState(config)
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  const sortedNoms = useMemo(() => {
    let sortableNoms = NominationsData ? [...NominationsData] : []

    if(sortConfig !== null) {
      sortableNoms.sort((a, b) => {
        if(sortConfig.key.includes('Name')) {
          let aLastName = a[sortConfig.key].toUpperCase().split(' ').slice(-1)
          let bLastName = b[sortConfig.key].toUpperCase().split(' ').slice(-1)
          if (aLastName < bLastName) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (aLastName > bLastName) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        if (sortConfig.key === 'dateReceived') {
          console.log(a[sortConfig.key] < b[sortConfig.key])
          if(a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if(a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        return 0
      })
    }
    console.log(sortableNoms)
    return sortableNoms
  }, [NominationsData, sortConfig])

  const requestSort = (key) => {
    let direction = 'ascending'

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { nominations: sortedNoms, requestSort, sortConfig }
}

export default useSort