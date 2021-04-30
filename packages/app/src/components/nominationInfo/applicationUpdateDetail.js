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

    // Formik object which handles form updates and submits changes.
    const patientEditForm = () => {
        const formik = useFormik({
            initialValues: { // These initial values should be pulled from the objects in ../nominationInfo/index.js...how?
                admissionDate: '',
                dischargeDate: '',
                repName: '',
                email: '',
                phoneNum: '',
                relationship: '',
                spanishComms: '',
            },
            validationSchema: Yup.object({
                admissionDate: Yup.date.required('Required'),
                dischargeDate: Yup.date.required('Required'),
                repName: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'), // Need to validate to actual email
                phoneNum: Yup.string().required('Required'), // Need to validate as valid phone number
                relationship: Yup.string().required('Required'), // Need to validate to certain relationships
                spanishComms: Yup.string().required('Required'), // Need to validate to yes or no
            }),
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
        });
    }
    // let saveConfirm = false;

    // // Directly manipulates corresponding props values based on if statement checks.
    // // TODO: Need to figure out data validation in the form.
    // const handleChange = (e) => {
    //     // Prevents infinite change loop.
    //     e.preventDefault();
    //     saveConfirm = true;

    //     // e.target.name checks props obj name string
    //     if (e.target.name === 'Admission Date') {
    //         props.propsData[2].value = e.target.value;
    //     }

    //     if (e.target.name === 'Discharge Date') {
    //         props.propsData[3].value = e.target.value;
    //     }

    //     if (e.target.name === 'Representative Name') {
    //         props.propsData[0].value = e.target.value;
    //     }

    //     if (e.target.name === 'Email Address') {
    //         props.propsData[1].value = e.target.value;
    //     }

    //     if (e.target.name === 'Phone Number') { 
    //         props.propsData[2].value = e.target.value;
    //     }

    //     if (e.target.name === 'Relationship') {
    //         props.propsData[3].value = e.target.value;
    //     }

    //     if (e.target.name === 'Request to communicate in Spanish?') {
    //         props.propsData[4].value = e.target.value;
    //     }
    // }
    
    // // Handles form submission to back end.
    // const handleSubmit = (e) => {
    //     // Tries to update database with an API call, catches error if one occurs.
    //     if (saveConfirm === true) {
    //         try {
    //             nominationsAPI.updateActiveNomData(activeNomination.id, props.propsData);
    //             console.log("success");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }

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