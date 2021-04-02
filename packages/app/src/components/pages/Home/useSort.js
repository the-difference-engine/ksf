import React, { useState, useMemo, useContext } from 'react'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const useSort = () => {
  const [sortConfig, setSortConfig] = useState({key: 'dateReceived', direction: 'ascending'})
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  const sortNominationsByName = (nomsToSort) => {
    nomsToSort.sort((a, b) => {
      let aFirstLetter = a[sortConfig.key].toUpperCase().slice(0)
      let bFirstLetter = b[sortConfig.key].toUpperCase().slice(0)

      if (aFirstLetter < bFirstLetter) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }

      if (aFirstLetter > bFirstLetter) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }

      return 0
    })
    return nomsToSort
  }

  const sortNominationsByDate = (nomsToSort) => {
    nomsToSort.sort((a, b) => {
      let aDate = new Date(a[sortConfig.key])
      let bDate = new Date(b[sortConfig.key])

      if (aDate < bDate) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }

      if (aDate > bDate) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }

      return 0
    })
    return nomsToSort
  }

  const sortedNoms = useMemo(() => {
    let sortableNoms = NominationsData ? [...NominationsData] : []

    if (sortConfig && sortConfig.key.includes('Name')) {
      sortNominationsByName(sortableNoms)
    }

    if (sortConfig && sortConfig.key === 'dateReceived') {
      sortNominationsByDate(sortableNoms)
    }

    return sortableNoms
  }, [NominationsData, sortConfig])

  const requestSort = (key, dontDoDefault) => {
    console.log(key)
    let direction= 'ascending'
    if (dontDoDefault !== 0 && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    if (dontDoDefault === 0) {
      direction= 'ascending'
    }

    setSortConfig({ key, direction })
    console.log('*********************')
    console.log(sortConfig)
    console.log('*********************')
  }

  return { sortedNoms, requestSort, sortConfig }
}

export default useSort
