import React, { useState, useMemo, useContext } from 'react'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const useSort = () => {
  const [sortConfig, setSortConfig] = useState({key: 'dateReceived', direction: 'ascending'})
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  console.log(NominationsData)

// the data is coming from backend, through model, where the date is using sequelize datatype Date, does it mean it has already sifted and converted irregular date entries?
  const convertDate = (str) => {
    const dateArr = str.split('/')
    const year = dateArr[2]
    const month = dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]
    const day = dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]

    return year + month + day
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
          // let aDate = convertDate(a[sortConfig.key])
          // let bDate = convertDate(b[sortConfig.key])
          let aDate = new Date(a[sortConfig.key])
          let bDate = new Date(b[sortConfig.key])
          if(aDate > bDate) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if(aDate < bDate) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        return 0
      })
    }
    return sortableNoms
  }, [NominationsData, sortConfig])

  // const sortNominationsByName = (sortableNoms) => {
  //   sortableNoms.sort((a, b) => {
  //     let aLastName = a[sortConfig.key].toUpperCase().split(' ').slice(-1)
  //     let bLastName = b[sortConfig.key].toUpperCase().split(' ').slice(-1)
  //     if (aLastName < bLastName) {
  //       return sortConfig.direction === 'ascending' ? -1 : 1
  //     }
  //     if (aLastName > bLastName) {
  //       return sortConfig.direction === 'ascending' ? 1 : -1
  //     }
  //     return 0
  //   })
  //   return sortableNoms
  // }

  // const sortNominationsByDate = (sortableNoms) => {
  //   sortableNoms.sort((a, b) => {
  //     let aDate = convertDate(a[sortConfig.key])
  //     let bDate = convertDate(b[sortConfig.key])
  //     if(aDate > bDate) {
  //       return sortConfig.direction === 'ascending' ? -1 : 1
  //     }
  //     if(aDate < bDate) {
  //       return sortConfig.direction === 'ascending' ? 1 : -1
  //     }
  //     return 0
  //   })
  //   return sortableNoms
  // }

  // const sortedNoms = useMemo(() => {
  //   let sortableNoms = NominationsData ? [...NominationsData] : []

  //   if(sortConfig && sortConfig.key.includes('Name')) {
  //     sortNominationsByName(sortableNoms)
  //   }
  //   if(sortConfig && sortConfig.key === 'dateReceived') {
  //     sortNominationsByDate(sortableNoms)
  //   }
  // }, [NominationsData, sortConfig])

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
