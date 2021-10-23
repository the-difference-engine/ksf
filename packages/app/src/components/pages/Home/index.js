import React, { useContext, useEffect } from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import SyncNominations from '../../syncNominations/syncNominations';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import nominationsAPI from '../../../utils/API/nominationsAPI';
import states from 'us-state-codes';
import {
  faChevronCircleDown,
  faChevronCircleUp,
  faFileImage,
  faEllipsisV,
  faCog,
  faTimes,
  faPencilAlt,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import ApplicationViewByStages from './ApplicationViewByStages';
library.add(
  fab,
  faChevronCircleDown,
  faChevronCircleUp,
  faFileImage,
  faEllipsisV,
  faCog,
  faTimes,
  faPencilAlt,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown
);

const Home = () => {
  console.log('home page is running');
  const { NominationsData, setNominationsData } = useContext(
    NominationsDataContext
  );
  useEffect(() => {
    findAllNominations();
  }, []);

  const findAllNominations = () => {
    nominationsAPI
      .getNominations()
      .then((res) => {
        const nominations = res.data;
        nominations.forEach((nomination) => {
          nomination.nominationName = nomName(nomination);
          nomination.dateReceived = new Date(
            nomination.dateReceived
          ).toLocaleDateString();
        });
        setNominationsData(nominations);
      })
      .catch((err) => console.log(err));
  };

  const nomName = (n) => {
    const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
    const geoState = states.getStateCodeByStateName(n.hospitalState);
    return `${lastName}-${geoState}`;
  };
  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div>
        <SyncNominations />
        <NewFilesToReview />
      </div>
      <div>
        <ApplicationViewByStages />
      </div>
    </>
  );
};

export default Home;
