import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import './style.css';
const ApplicationStages = () => {
    const [activeNomination, setActiveNomination] = useContext(
        ActiveNominationContext
    );
    const [currentStatus, setCurrentStatus] = useState("received");
    const status = [
        'received',
        'awaiting HIPPA',
        'HIPPA verified',
        'document review',
    ];

    useEffect(() => {
        setCurrentStatus(activeNomination.status);
    }, [currentStatus]);

    function advanceStage(activeNomStatus) {
        switch (activeNomStatus) {
        case 'received':
            activeNomination.status = 'awaiting HIPPA';
            setCurrentStatus("awaiting HIPPA");
            break;
        case 'awaiting HIPPA':
            activeNomination.status = 'HIPPA verified';
            setCurrentStatus("HIPPA verified");
            break;
        case 'HIPPA verified':
            activeNomination.status = 'document review';
            setCurrentStatus("document review");
            break;
        case 'document review':
            activeNomination.status = 'ready for board review';
            break;
        }
    };

    function createStatusEl() {
        const iOfActiveNomStat = status.indexOf(activeNomination.status);
        return status.map((stat, i) => (
        <>
            { iOfActiveNomStat === i ? (
            <div key={i} className="step current">
                <span>{stat}</span>
            </div>
            ) : iOfActiveNomStat < i ? (
            <div key={i} className="step">
                <span>{stat}</span>
            </div>
            ) : iOfActiveNomStat > i ? (
            <div key={i} className="step complete">
                <span>{stat}</span>
            </div>
            ) : (
            null
            )}
        </>
        ));
    }
    return (
        <>
        <div className="container">
            <div className="wrapper">
            <div className="arrow-steps clearfix">{createStatusEl()}</div>
            <div className="nav clearfix">
                <div
                href="#"
                className="next pull-right"
                onClick={() => advanceStage(activeNomination.status)}
                >
                &#10003; Mark Stage as Complete
                </div>
            </div>
            </div>
        </div>
        </>
    );
};
export default ApplicationStages;