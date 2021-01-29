import React, {useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import SyncNominations from '../../syncNominations/syncNominations'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV)

const Home = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div>
        <SyncNominations />
        <NewFilesToReview />
      </div>
    </>
  );
};

export default Home;
