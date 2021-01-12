import React, {useEffect, useContext} from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faChevronCircleDown, faChevronCircleUp, faFileImage, faEllipsisV)

const Home = () => {
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
