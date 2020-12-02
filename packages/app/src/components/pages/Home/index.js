import React, {useEffect, useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import states from 'us-state-codes';
import nominationsAPI from '../../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const Home = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  useEffect(() => {
    findAllNominations();
  }, []);

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        const nominations = res.data;
        let nomName = (n) => {
          const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
          const state = states.getStateCodeByStateName(n.hospitalState);
          return `${lastName}-${state}`;
        };
        nominations.forEach((nomination) => {
          nomination.nominationName = nomName(nomination);
          nomination.dateReceived = new Date(
            nomination.dateReceived
          ).toLocaleDateString();
        });
        setNominationsData(nominations);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div>
        <NewFilesToReview />
      </div>
    </>
  );
};

export default Home;
