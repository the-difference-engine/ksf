import React, {useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import SyncNominations from '../../syncNominations/syncNominations'
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV, faCog, faTimes, faPencilAlt, faTrashAlt, faArrowRight, faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import ApplicationViewByStages from './ApplicationViewByStages';
library.add(fab, faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV, faCog, faTimes, faPencilAlt, faTrashAlt, faArrowRight, faArrowLeft, faArrowUp, faArrowDown)

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
      <div>
        <ApplicationViewByStages />
      </div>
    </>
  );
};

export default Home;
