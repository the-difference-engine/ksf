import React from "react";
import styles from "./styles.module.css";

const updatedFields = [{
        label = "Admission Date",
        value = properDateFormat
    },
    {
        label = "Discharge Date",
        value = activateNomation.dischargeDate
    },
    {
        label: "Family Name",
        value: activeNomination.representativeName
    },
    {
        label: "Email Address",
        value: activeNomination.representativeEmailAddress
    },
    {
        label: "Phone Number",
        value: activeNomination.representativePhoneNumber
    },
    {
        label: "Relationship",
        value: activeNomination.representativeRelationship
    },
    {
        label: "Request to communicate in Spanish?",
        value: "No"
    }];

function ApplicationUpdateDetail(props) {
    // const [formData, setFormData] 
    const handleChange = (e) => {
        e.preventDefault()
        console.log(props.propsData)
        console.log(e.target.value)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
                props.title == "Patient Information" ? <div>
                    <form onChange={(e) => handleChange(e)}>
                        <h1></h1>
                        <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                            {
                                props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                    {obj.label === "Admission Date" || obj.label === "Discharge Date" ?
                                        <div><label className={styles.label}>{obj.label}</label>
                                            <input name={obj.label} type="date" defaultValue={obj.value} /></div> :
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

export default updatedFields;
export default ApplicationUpdateDetail;