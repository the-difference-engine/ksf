import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NominationBanner from './nominationBanner'

const NominationShow = (props) => {
  const [NominationData, setNominationData] = useState({})

  useEffect(() => {
    axios.get(`/nomination/${props.match.params.id}`)
      .then(function (response) {
          const nomination = response.data.nomination
          // console.log(nomination)
          setNominationData(nomination)
  })},[props.match.params.id])

  return (
    <div className="nomination-show-page">
      <NominationBanner nomination={NominationData && NominationData}/>
    </div>
  );
};

export default NominationShow;
