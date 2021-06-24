import React, { useState, useMemo, useContext } from 'react'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { SORT_DIRECTION } from '../../enum.js';

const useSort = (nomsToSort=[]) => {
  const [sortConfig, setSortConfig] = useState({key: 'dateReceived', direction: SORT_DIRECTION.UP})
  // const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  const sortNominationsByName = (nomsToSort) => {
    nomsToSort.sort((a, b) => {
      let aFirstLetter = a[sortConfig.key].toUpperCase().slice(0)
      let bFirstLetter = b[sortConfig.key].toUpperCase().slice(0)

      if (aFirstLetter < bFirstLetter) {
        return sortConfig.direction === SORT_DIRECTION.UP ? -1 : 1
      }

      if (aFirstLetter > bFirstLetter) {
        return sortConfig.direction === SORT_DIRECTION.UP ? 1 : -1
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
        return sortConfig.direction === SORT_DIRECTION.UP ? 1 : -1
      }

      if (aDate > bDate) {
        return sortConfig.direction === SORT_DIRECTION.UP ? -1 : 1
      }

      return 0
    })
    return nomsToSort
  }

  const sortedNoms = useMemo(() => {
    //let sortableNoms = NominationsData ? [...NominationsData] : []
    let sortableNoms = nomsToSort ? [...nomsToSort] : []

    if (sortConfig && sortConfig.key.includes('Name')) {
      sortNominationsByName(sortableNoms)
    }

    if (sortConfig && sortConfig.key === 'dateReceived') {
      sortNominationsByDate(sortableNoms)
    }

    return sortableNoms
  }, [nomsToSort, sortConfig])

  const requestSort = (key, doDefault) => {
    // direction is default sort direction
    let direction = SORT_DIRECTION.UP;
    if (!doDefault && sortConfig.key === key && sortConfig.direction === SORT_DIRECTION.UP) {
      direction = SORT_DIRECTION.DOWN;
    }

    setSortConfig({ key, direction })
  }

  return { sortedNoms, requestSort, sortConfig }
}

export default useSort
