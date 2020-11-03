import React, { Component } from 'react';
import axios from 'axios';

const Nomination = (props) => {
  return (
    <div className="nomination-show-page">
      <NominationHeader nomination={props.id} />
    </div>
  );
};

export default Nomination;
