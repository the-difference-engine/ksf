import React, { useState, useMemo, useContext } from 'react'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const useSort = (config = null) => {

  const [sortConfig, setSortConfig] = useState(config)
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  const convertDate = (str) => {
    const dateArr = str.split('/')
    if (dateArr[0].length === 1 && dateArr[1].length === 1) {
      const convertedDate = `${dateArr[2]}0${dateArr[0]}0${dateArr[1]}`
      return convertedDate
    }
    if (dateArr[0].length === 1 && dateArr[1].length > 1) {
      const convertedDate = `${dateArr[2]}0${dateArr[0]}${dateArr[1]}`
      return convertedDate
    }
    if (dateArr[0].length > 1 && dateArr[1].length === 1) {
      const convertedDate = `${dateArr[2]}${dateArr[0]}0${dateArr[1]}`
      return convertedDate
    }
    else {
      const convertedDate = dateArr[2] + dateArr[0] + dateArr[1]
      return convertedDate
    }
  }

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
          let aDate = convertDate(a[sortConfig.key])
          let bDate = convertDate(b[sortConfig.key])
          if(aDate < bDate) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if(aDate > bDate) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        return 0
      })
    }
    return sortableNoms
  }, [NominationsData, sortConfig])

  const requestSort = (key) => {
    let direction = 'ascending'

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { sortedNoms, requestSort, sortConfig }
}

export default useSort