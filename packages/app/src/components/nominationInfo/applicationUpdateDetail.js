import React from "react";
import { useState } from 'react';
import styles from "./styles.module.css";

// const updatedFields = [{
//         label = "Admission Date",
//         value = properDateFormat
//     },
//     {
//         label = "Discharge Date",
//         value = activateNomation.dischargeDate
//     },
//     {
//         label: "Family Name",
//         value: activeNomination.representativeName
//     },
//     {
//         label: "Email Address",
//         value: activeNomination.representativeEmailAddress
//     },
//     {
//         label: "Phone Number",
//         value: activeNomination.representativePhoneNumber
//     },
//     {
//         label: "Relationship",
//         value: activeNomination.representativeRelationship
//     },
//     {
//         label: "Request to communicate in Spanish?",
//         value: "No"
//     }];

function ApplicationUpdateDetail(props) {
    // Directly manipulates corresponding props values based on if statement checks.
    const handleChange = (e) => {
        e.preventDefault()

        if (e.target.name === 'Admission Date') {
            props.propsData[2].value = e.target.value
            console.log(props.propsData[2].label === e.target.name)
            console.log(props.propsData[2].value)
        }

        if (e.target.name === 'Discharge Date') {
            props.propsData[3].value = e.target.value
            console.log(props.propsData[3].value)
        }

        if (e.target.name === 'Representative Name') {
            props.propsData[0].value = e.target.value
            console.log(props.propsData[0].value)
        }

        if (e.target.name === 'Email Address') {
            props.propsData[1].value = e.target.value
            console.log(props.propsData[1].value)
        }

        if (e.target.name === 'Phone Number') {
            props.propsData[2].value = e.target.value
            console.log(props.propsData[2].value)
        }

        if (e.target.name === 'Relationship') {
            props.propsData[3].value = e.target.value
            console.log(props.propsData[3].value)
        }

        if (e.target.name === 'Request to communicate in Spanish?') {
            props.propsData[4].value = e.target.value
            console.log(props.propsData[4].value)
        }

        // How do we write these changes to the database? Following statement shows they are updated.
        console.log(props.propsData)
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

// export default updatedFields;
export default ApplicationUpdateDetail;