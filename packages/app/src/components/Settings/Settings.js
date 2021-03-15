import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './styles.css';

const Settings = () => {
    const [newGrantCycle, setNewGrantCycle] = useState({openedOn: "", closedOn: ""});
    const [allGrantCycles, setGrantCycles] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [errors, setErrors] = useState("");

    async function getGrantCycles() {
        const { data } = await grantCycleAPI.getGrantCycles();
        setGrantCycles(data);
    }

    useEffect(() => {
        getGrantCycles();
    }, []);

    const handleChange = ({currentTarget: input}) => {
        const grantCycle = {...newGrantCycle};
        grantCycle[input.name] = input.value;
        setNewGrantCycle(grantCycle);

        if (new Date(grantCycle.openedOn) && new Date(grantCycle.closedOn)) {
            const millisecondsInADay = 86400000;
            const startDate = new Date(grantCycle.openedOn);
            const endDate = new Date(grantCycle.closedOn);
            const result = endDate - startDate >= millisecondsInADay ? false : true;
            
            setDisableButton(result);
        }
    }

    const handleCreate = async () => {
        try{
            const {data} = await grantCycleAPI.createGrantCycle(newGrantCycle);
            setNewGrantCycle({openedOn: "", closedOn: ""})
            getGrantCycles();
        }
        catch(ex) {
            if (ex.response && ex.response.status === 400) {
                setErrors(ex.response.data);
            }
        }
    }

    const formatDateString = date => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        const result = `${month}-${day}-${year}`;
        return result;
    }

    return ( 
        <div className="settings-container">
            <header className="settings-header">
                <h1 className="settings-heading">
                    Settings
                </h1>
            </header>
            <main className="settings-main">
                <aside className="settings-sidebar">
                    <ul className="settings-list">
                        <li>Grant Cycle</li>
                    </ul>
                </aside>
                <section className="settings-section">
                    <h2 className="settings-section-heading">Create Grant Cycle</h2>
                    <div className="settings-form">
                        <div className="settings-input-block">
                            <p>Start Date:</p>
                            <span className="settings-input">
                                <input
                                    value={newGrantCycle.openedOn}
                                    name="openedOn"
                                    onChange={handleChange}
                                    
                                    type="date"
                                />
                            </span>
                        </div>
                        <div className="settings-input-block">
                            <p>End Date:</p>
                            <span className="settings-input">
                                <input
                                    value={newGrantCycle.closedOn}
                                    name="closedOn"
                                    onChange={handleChange}
                                    
                                    type="date"
                                />
                            </span>
                        </div>
                    </div>
                    <button disabled={disableButton} onClick={handleCreate} className="settings-button">Create</button>
                    <div className="settings-form-errors">{ errors }</div>
                    <h2 className="settings-section-heading">Grant Cycle History</h2>
                    <table className="settings-table">
                        <thead className="settings-thead">
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Applicatons</th>
                            </tr>
                        </thead>
                        <tbody className="settings-tbody">
                            {allGrantCycles.map(gc => (
                                <tr key={gc.id}>
                                    <td>{formatDateString(gc.openedOn)}</td>
                                    <td>{formatDateString(gc.closedOn)}</td>
                                    <td>{gc.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
     );
}
 
export default Settings;
