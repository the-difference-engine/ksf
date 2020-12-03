import React, { useState, useContext } from "react";
import { ActiveNominationContext } from  '../../utils/context/ActiveNominationContext';

const ApplicationStages = () => {

    const [activeNomination, setActiveNomination] = useContext( ActiveNominationContext );
    return (
        <>
        <p>Hello Application Stages</p>
        {console.log(activeNomination)};
        </>
    );
};

export default ApplicationStages;