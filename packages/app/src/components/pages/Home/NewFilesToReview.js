import React, { useEffect, useState, useContext } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';


const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  const filteredNoms = NominationsDataContext.each((nomination) => {
      return [
       (nomination.providerName),
        (nomination.applicationName),
        (nomination.representativeName),
        (nomination.receivedDate),
      ].some((nom) => nom.includes(searchTerm));
    });
    setSearchResultData(filteredNoms);

  return (
    <h1>hi</h1>
  );
};

export default NewFilesToReview;
