import React, { useContext } from "react";
import styles from "./styles.module.css";
import nominationsAPI from "./../../utils/API/nominationsAPI.js";
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';

function ApplicationUpdateDetail(props) {
    const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);
    let saveConfirm = false;
    // Directly manipulates corresponding props values based on if statement checks.
    const handleChange = (e) => {
        // Prevents infinite change loop.
        e.preventDefault();
        saveConfirm = true;

        if (e.target.name === 'Admission Date') {
            props.propsData[2].value = e.target.value;
        }

        if (e.target.name === 'Discharge Date') {
            props.propsData[3].value = e.target.value;
        }

        if (e.target.name === 'Representative Name') {
            props.propsData[0].value = e.target.value;
        }

        if (e.target.name === 'Email Address') {
            props.propsData[1].value = e.target.value;
        }

        if (e.target.name === 'Phone Number') {
            props.propsData[2].value = e.target.value;
        }

        if (e.target.name === 'Relationship') {
            props.propsData[3].value = e.target.value;
        }

        if (e.target.name === 'Request to communicate in Spanish?') {
            props.propsData[4].value = e.target.value;
        }
    }
    const handleSubmit = (e) => {
        console.log("Sommmmeeee bullll")
        // Tries to update database with an Axios call, catches error if one occurs.
        if (saveConfirm === true) {
            try {
                nominationsAPI.updateActiveNomData(activeNomination.id, props.propsData);
                console.log("success");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <h1></h1>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    {obj.label === "Admission Date" || obj.label === "Discharge Date" ?
                                        <div><label className={styles.label}>{obj.label}</label>
                                            <input onChange={(e) => handleChange(e)} name={obj.label} type="date" defaultValue={obj.value} /></div> :
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