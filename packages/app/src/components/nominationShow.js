import React, { useEffect, useState } from 'react';
import fetchNomination from '../utils/API/fetchNomination'

const NominationShow = (props) => {
  const [NominationData, setNominationData] = useState([])
  // const nonimationId = props.match.params.id

  function findNominationById(props) {
    // console.log(props.match.params.id)
    fetchNomination(props.match.params.id)
    .then((res) => {
      setNominationData([res.data.nomination])
    })
  }

  useEffect(() => {
    findNominationById(props)
  })


  return (
    <div className="nomination-show-page">
      <p>{NominationData.hospitalCity}</p>
    </div>
  );
};

export default NominationShow;