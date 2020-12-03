import React, { useState, useContext } from "react";
import { ActiveNominationContext } from  '../../utils/context/ActiveNominationContext';
import './style.css';
const ApplicationStages = () => {

    const [activeNomination, setActiveNomination] = useContext( ActiveNominationContext );
    
    return (
        <>
        {console.log(activeNomination)}
        <div className="nomination-bar-wrapper">
            <div className="row">
                <div className="column">&#10003;</div>
                <div className="column">Awaiting HIPAA</div> 
                <div className="column">HIPAA Verified</div>
                <div className="column">Document Review</div>
                <div className="column">Ready for Board Review</div>
            </div>
            <div>
                <button>&#10003; Mark Stage as Complete</button>
            </div>
        </div>
        </>
    );
};

export default ApplicationStages;