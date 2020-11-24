import React from 'react';
import SearchBar from '../../SearchBar';
import NewFilesToReview from './NewFilesToReview';

const home = () => {
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

export default home;
