import React from "react";
import styles from "./styles.module.css";

function HealthProvider(props) {
    const fields = [
        {
          label: "Name",
          value: props.providerName
        },
        {
          label: "Email Address",
          value: props.emailAddress
        },
        {
          label: "Phone Number",
          value: props.providerPhoneNumber
        },
        {
            label: "Title",
            value: props.providerTitle
        },
        {
          label: "Email Validated",
          value: props.emailValidated
        },
        {
          label: "Public Email Domain",
          value: props.publicEmailDomain
        },
        {
          label: "Patient Diagnosis",
          value: props.patientDiagnosis
        }];
      return (
        <div className={styles.main}>
          <div className={styles.header}>
            <label className={styles.bold}>Health Provider Information</label>
          </div>
          <div className={[styles.content, styles["grid-container"]].join(" ")}>
            {
              fields.map((obj) => (<div key={obj.label}>
                <label>{obj.label}</label>
                <span>{String(obj.value)}</span>
              </div>))
            }
          </div>
        </div>
      );
    }
  
  export default HealthProvider;