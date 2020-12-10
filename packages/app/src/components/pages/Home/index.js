import React, {useEffect, useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import states from 'us-state-codes';
import nominationsAPI from '../../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV)

const Home = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

// TODO figure out way to garuantee global state is set before things render
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
