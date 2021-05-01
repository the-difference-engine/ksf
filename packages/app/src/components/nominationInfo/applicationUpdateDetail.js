import React, { useContext } from "react";
import styles from "./styles.module.css";
import nominationsAPI from "./../../utils/API/nominationsAPI.js";
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import { useFormik } from "formik"; // npm install formik --save
import * as Yup from 'yup'; // npm install yup --save

/**
 * Function which is called to update the current active nomination's data fields.
 * 
 * @param {*} props - active nomination props 
 * @returns - renders data based on click status of edit button
 */
function ApplicationUpdateDetail(props) {
    const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const yesNoRegex = /^(?:Yes\b|No\b)/;
    
    // Formik object which handles form updates and submits changes.
    const patientEditForm = () => {
        const formik = useFormik({
            initialValues: { // These initial values should be pulled from the objects in ../nominationInfo/index.js...how?
                admissionDate: props.propsPatientData[2].value,
                dischargeDate: props.propsPatientData[3].value,
                repName: props.propsFamData[0].value,
                email: props.propsFamData[1].value,
                phoneNum: props.propsFamData[2].value,
                relationship: props.propsFamData[3].value,
                spanishComms: props.propsFamData[4].value,
            },
            // Yup handles validation in schema format. Confirm required function call does not matter for unchanged values.
            validationSchema: Yup.object({
                admissionDate: Yup.date().max(today).required('Required'),
                dischargeDate: Yup.date().max(today).required('Required'),
                repName: Yup.string().min(3, "Must be 3 characters or more.").max(30, 'Must be 30 characters or less.').required('Required'),
                email: Yup.string().email('Invalid email address.').required('Required'), // This handles email validation with no regex.
                phoneNum: Yup.string().matches(phoneRegex, "Please enter a valid phone number.").required('Required'),
                relationship: Yup.string().min(3, "Must be at least 3 characters.").max(20, "Must be no more than 20 characters.").required('Required'),
                spanishComms: Yup.string().matches(yesNoRegex, "Please enter yes or no.").required('Required'),
            }),
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
        });
    }
    
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form onSubmit={formik.handleSubmit}>
                        <h1></h1>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    {obj.label === "Admission Date" || obj.label === "Discharge Date" ?
                                        <div><label className={styles.label}>{obj.label}</label>
                                        {/* Need to tie label to value in next line somehow, and make functional for each label. */}
                                            <input onChange={formik.handleChange} name={obj.label} type="date" defaultValue={obj.value} value={formik.values.admissionDate}/></div> :
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
                // False condition which does not change any form data.
                    : <form onSubmit={formik.handleSubmit}>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    <label className={styles.label}>{obj.label}</label>
                                    <input name={obj.label} onChange={formik.handleChange} type="text" defaultValue={obj.value} />
                                </div>))
                            }
                        </div>
                    </form>
            }
        </div>
    );
}

export default ApplicationUpdateDetail;