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
    
    const onSubmit = data => {
        if (hasBeenClicked) {
            console.log('this happened')
            try {
            nominationsAPI.updateActiveNomData(activeNomination.id, data)
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        if (hasBeenClicked) {
            onSubmit();
            hasBeenClicked=false;
    }});

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form
                        id="update-form"
                        onSubmit={handleSubmit(onSubmit)}>
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
                                                {...register(obj.label, {required: true}, {valueAsDate: true})} 
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
                                    <input 
                                        name={obj.label}
                                        type="text"
                                        defaultValue={obj.value}
                                        {...register(obj.label, {required: true})}
                                    />
                                </div>))
                            }
                        </div>
                    </form>
            }
        </div>
    );
}

export default ApplicationUpdateDetail;