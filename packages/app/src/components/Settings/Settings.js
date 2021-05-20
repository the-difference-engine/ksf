import React, { useState, useEffect, useRef } from 'react';
import TableRow from './TableRow';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './styles.css';

const Settings = (props) => {
    const [newGrantCycle, setNewGrantCycle] = useState({openedOn: "", closedOn: "", name: ""});
    const [allGrantCycles, setGrantCycles] = useState([]);
    const [disableButton, setDisableButton] = useState(true);
    const [errors, setErrors] = useState("");
    const createButton = useRef(null);
    const [updateId, setUpdateId] = useState(null);
    const [activeGrantCycle, setActiveGrantCycle] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    async function getGrantCycles() {
        const { data } = await grantCycleAPI.getGrantCycles();
        setGrantCycles(data);
    }

    async function getActiveGrantCycle() {
        const { data } = await grantCycleAPI.getActiveGrantCycle();
        if (data) {
            setActiveGrantCycle(data);
        }
    }

    useEffect(() => {
        getGrantCycles();
        getActiveGrantCycle();
    }, []);

    const handleChange = ({currentTarget: input}) => {
        const grantCycle = {...newGrantCycle};
        grantCycle[input.name] = input.value;
        setNewGrantCycle(grantCycle);
    }

    const handleCreate = async (e) => {
        
        try{
            if (updateId) {
                
                const grantCycle = {...newGrantCycle};
                grantCycle["id"] = updateId;
                const { data } = await grantCycleAPI.updateGrantCycle(grantCycle);
                setUpdateId(null);
            }
            else {
                const {data} = await grantCycleAPI.createGrantCycle(newGrantCycle);
            }
            setNewGrantCycle({openedOn: "", closedOn: "", name: ""})
            createButton.current.blur();
            getGrantCycles();
        }
        catch(ex) {
            if (ex.response && ex.response.status === 400) {
                setErrors(ex.response.data);
                createButton.current.blur();
            }
        }
    }

    const handleEdit = gc => {
        setUpdateId(gc.id);
        setNewGrantCycle({ openedOn: gc.openedOn.split("T")[0], closedOn: gc.closedOn.split("T")[0] });
    }

    useEffect(() => {
        handleDisableButton(newGrantCycle);
    }, [newGrantCycle])

    const handleDisableButton = (gc) => {
        if (gc.openedOn !== "" && gc.closedOn !== "") {
            const millisecondsInADay = 86400000;
            const startDate = new Date(gc.openedOn);
            const endDate = new Date(gc.closedOn);
            const result = endDate - startDate >= millisecondsInADay ? false : true;
            
            setDisableButton(result);
            if (!result) {
                setErrors("")
                if (gc.name === "") {
                    setDisableButton(true);
                    setErrors("Please enter a name for the grant cycle");
                }
            }
            else setErrors("Start Date must be earlier than End Date");
        }
        else {
            setDisableButton(true);
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
        <div className="settings__container">
            <header className="settings__header">
                <h1 className="settings__title">
                    Settings
                </h1>
            </header>
            
            <aside className="settings__sidebar">
                <ul className="settings__list">
                    <li className="settings__list-item">Grant Cycle</li>
                </ul>
            </aside>

            <main className="settings__main">
                <h2 className="settings__heading">Create Grant Cycle</h2>
                <div className="settings__form">
                    <div className="settings__input-block">
                        <p className="settings__input-label">Start Date:</p>
                        <span className="settings__input">
                            <input
                                value={newGrantCycle.openedOn}
                                name="openedOn"
                                onChange={handleChange}
                                type="date"
                            />
                        </span>
                    </div>
                    <div className="settings__input-block">
                        <p className="settings__input-label">End Date:</p>
                        <span className="settings__input">
                            <input
                                value={newGrantCycle.closedOn}
                                name="closedOn"
                                onChange={handleChange}
                                type="date"
                            />
                        </span>
                    </div>
                    <div className="settings__input-block">
                        <p className="settings__input-label">Name:</p>
                        <span className="settings__input">
                            <input
                                value={newGrantCycle.name}
                                name="name"
                                onChange={handleChange}
                                type="text"
                            />
                        </span>
                    </div>
                </div>
                <button ref={createButton} disabled={disableButton} onClick={handleCreate} className="settings__button">Create</button>
                <div className="settings__form-errors">{ errors }</div>

                
                    <div>
                        <h2 className="settings__heading">Active Grant Cycle: &nbsp;&nbsp;&nbsp;&nbsp;{activeGrantCycle ? <span className="settings__activeGrantCycle">{formatDateString(activeGrantCycle.openedOn)} - {formatDateString(activeGrantCycle.closedOn)}, Name: {activeGrantCycle.name}</span> : <span className="settings__activeGrantCycle">None</span>}</h2>
                    </div>
                

                <h2 className="settings__heading">Grant Cycle History</h2>
                <div className="settings__table-wrapper">
                    <table className="settings__table">
                        <thead className="settings__thead">
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Name</th>
                                <th className="settings__th-column">Applications<br/>Ready for Board Review</th>
                                <th>View<br/>Applications</th>
                            </tr>
                        </thead>
                        <tbody className="settings__tbody">
                            {allGrantCycles.map(gc => (
                                <TableRow key={gc.id} grantCycle={gc} onResultsClick={props.onResultsClick} onEdit={handleEdit}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            
        </div>
     );
}
 
export default Settings;
