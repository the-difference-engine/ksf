import React, {useEffect, useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV)

const Home = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);

  return (
    <>
    {
      NominationsData
      ?
        <>
          <div>
            <SearchBar />
          </div>
          <div>
            <NewFilesToReview />
          </div>
        </>
      :
      <p>Data Loading...</p>
    }
    </>
  );
};

export default Home;
