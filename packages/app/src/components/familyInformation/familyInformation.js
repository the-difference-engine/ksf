import React from "react";
import styles from "./styles.module.css";

function FamilyMemberInfo(props) {
  const fields = {
    "Name": props.familyRepresentativeName,
    "Email Address": props.familyRepresentativeEmailAddress,
    "Phone Number": props.familyRepresentativePhoneNumber,
    "Relationship": props.representativeRelationship,
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.bold}>Family Member Information</span>
      </div>
      <div className={styles.content}>
        {
          Object.keys(fields).map((label) => (<div key={label}>
            <label>{label}</label>
            <span>{fields[label]}</span>
          </div>))
        }
      </div>
    </div>
  );
}

export default FamilyMemberInfo;
