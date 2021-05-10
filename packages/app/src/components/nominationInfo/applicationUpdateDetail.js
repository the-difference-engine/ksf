import React, { useContext } from "react";
import styles from "./styles.module.css";
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import { Formik, Form } from "formik"; // npm install formik --save
import * as Yup from 'yup'; // npm install yup --save
import nominationsAPI from "../../utils/API/nominationsAPI";

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

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title === "Patient Information" ? <div>
                    <Formik initialValues={{
                        admissionDate: props.propsData[2].value,
                        dischargeDate: activeNomination.dischargeDate,
                        repName: activeNomination.representativeName,
                        email: activeNomination.representativeEmailAddress,
                        phoneNum: activeNomination.representativePhoneNumber,
                        relationship: activeNomination.representativeRelationship,
                        spanishComms: props.propsData[4].value,
                    }}  validationSchema={Yup.object({
                            admissionDate: Yup.date().required('Required'),
                            dischargeDate: Yup.date().min(Yup.ref('admissionDate'), 'Discharge date cannot be before admission date.').required('Required'),
                            repName: Yup.string().min(3, "Must be 3 characters or more.").max(30, 'Must be 30 characters or less.').required('Required'),
                            email: Yup.string().email('Invalid email address.').required('Required'), // This handles email validation with no regex.
                            phoneNum: Yup.string().matches(phoneRegex, "Please enter a valid phone number.").required('Required'),
                            relationship: Yup.string().min(3, "Must be at least 3 characters.").max(20, "Must be no more than 20 characters.").required('Required'),
                            spanishComms: Yup.string().matches(yesNoRegex, "Please enter yes or no.").required('Required'),
                    })}
                        // onSubmit needs to fire when props.hasBeenClicked it true...how??!
                        onSubmit={(values, actions) => {
                                nominationsAPI.updateActiveNomData(activeNomination.id, values);
                                actions.setSubmitting(false);
                        }}
                    >
                        {formikProps => (
                            <form onSubmit={formikProps.handleSubmit}>
                                <h1></h1>
                                <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                                    {
                                        props.propsData.map((obj) =>
                                        (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                            {obj.label === "Admission Date" || obj.label === "Discharge Date" ?
                                                <div>
                                                    <label className={styles.label}>{obj.label}</label>
                                                    {/* Need to tie label to value in next line somehow, and make functional for each label. */}
                                                    <input
                                                        name={obj.label}
                                                        type="date"
                                                        defaultValue={obj.value} />
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
                                {formikProps.errors.name && <div id="feedback">{formikProps.errors.name}
                                </div>}
                            </form>
                        )}
                    </Formik>
                </div>
                    // False condition which does not change any form data.
                    :
                    <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                        {
                            props.propsData.map((obj) =>
                            (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                <label className={styles.label}>{obj.label}</label>
                                <input name={obj.label} type="text" defaultValue={obj.value} />
                            </div>))
                        }
                    </div>
            }
        </div>
    );
}

export default ApplicationUpdateDetail;