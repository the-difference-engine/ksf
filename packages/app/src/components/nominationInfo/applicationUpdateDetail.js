import React, { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import nominationsAPI from "./../../utils/API/nominationsAPI.js";
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import { useForm } from 'react-hook-form'; // npm install react-hook-form

/**
 * Function which is called to update the current active nomination's data fields.
 * 
 * @param {*} props - active nomination props 
 * @returns - renders data based on click status of edit button
 */
function ApplicationUpdateDetail(props, hasBeenClicked) {
    const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);
    const { register, handleSubmit } = useForm();
    
    useEffect(() => {
        if (hasBeenClicked) {
            try {
                nominationsAPI.updateActiveNomData(activeNomination.id, props);
            } catch (err) {
                console.log(err);
            }
        }
    });

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form>
                        <h1></h1>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (
                                    <div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    {obj.label === "Admission Date" || obj.label === "Discharge Date" ?
                                        <div><label className={styles.label}>{obj.label}</label>
                                            <input 
                                                name={obj.label} 
                                                type="date" 
                                                defaultValue={obj.value} 
                                            />
                                        </div> 
                                        :
                                        <div>
                                            <label className={styles.label}>{obj.label}</label>
                                            <span className={styles.value}>{String(obj.value)}</span>
                                        </div>
                                    }
                                </div>))
                            }
                        </div>
                    </form>
                </div>
                    : <form>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    <label className={styles.label}>{obj.label}</label>
                                    <input name={obj.label} onChange={(e) => handleChange(e)} type="text" defaultValue={obj.value} />
                                </div>))
                            }
                        </div>
                    </form>
            }
        </div>
    );
}

export default ApplicationUpdateDetail;