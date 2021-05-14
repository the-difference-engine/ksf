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
    const { register, handleSubmit, getValues } = useForm();

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const yesNoRegex = /^(?:Yes\b|No\b)/;
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
    /**
     * Function which handles submitting form to back end
     * 
     * @param {*} data - form data to send to back end 
     */
    const sendToBackEnd = data => {
        if (hasBeenClicked) {
            console.log('this happened')
            console.log(data)
            try {
            nominationsAPI.updateActiveNomData(activeNomination.id, data)
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form
                        id="update-form"
                        onSubmit={handleSubmit(sendToBackEnd)}>
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
                                                {...register(obj.label, 
                                                    {required: true}, 
                                                    {valueAsDate: true},
                                                    {validate: yes => yes }
                                                )
                                            } 
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
                        <input 
                            label="Save" 
                            type="submit" />
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
                                        {...register("Representative Name", 
                                            {required: true}, 
                                            {min: 
                                                {value: 3, 
                                                message:"Please enter 3 or more characters."}
                                            }
                                            )
                                        }
                                    />
                                </div>))
                            }
                        </div>
                        <input type="submit" />
                    </form>
            }
        </div>
    );
}

export default ApplicationUpdateDetail;