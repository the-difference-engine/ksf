import React, { useState, useContext } from "react";
import { ActiveNominationContext } from  '../../utils/context/ActiveNominationContext';
import './style.css';
const ApplicationStages = () => {

    const [activeNomination, setActiveNomination] = useContext( ActiveNominationContext );
    
    function advanceStage(e) {
        console.log(activeNomination.status);
        if(activeNomination.status === "received") {
            console.log("i am clicked");
            let holderArr = activeNomination;
            holderArr.status = "awaiting HIPPA"
            setActiveNomination(holderArr);
            console.log(holderArr.status);
            console.log(activeNomination.status);
        }
        if(activeNomination.status === "awaiting HIPPA") {
            console.log("i am clicked");
            let holderArr = activeNomination;
            holderArr.status = "HIPPA verified"
            setActiveNomination(holderArr);
            console.log(holderArr.status);
            console.log(activeNomination.status);
        }
        if(activeNomination.status === "HIPPA verified") {
            console.log("i am clicked");
            let holderArr = activeNomination;
            holderArr.status = "document review"
            setActiveNomination(holderArr);
            console.log(holderArr.status);
            console.log(activeNomination.status);
        }
        if(activeNomination.status === "document review") {
            console.log("i am clicked");
            let holderArr = activeNomination;
            holderArr.status = "ready for board review"
            setActiveNomination(holderArr);
            console.log(holderArr.status);
            console.log(activeNomination.status);
        }
    }

    return (
        <>
        {console.log(activeNomination)}
        <div className="nomination-bar-wrapper">
            <div className="nomination-stage-bar row">
                <div className="column complete bar">&#10003;</div>
                <div className="column active hippa-bar">Awaiting HIPAA<span className="arrow"></span></div> 
                <div className="column awaiting bar">HIPAA Verified</div>
                <div className="column awaiting bar">Document Review</div>
                <div className="column awaiting bar">Ready for Board Review</div>
                <div className="column"></div>
                <div className="column complete-button"onClick={() => advanceStage()}>&#10003; Mark Stage as Complete</div>
            </div>
        </div>
        </>
    );
};

export default ApplicationStages;