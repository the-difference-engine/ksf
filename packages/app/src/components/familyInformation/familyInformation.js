import React from "react";
import styles from "./styles.module.css";

function FamilyMemberInfo(props) {
  const fields = [
    {
      label: "Name",
      value: props.familyRepresentativeName
    },
    {
      label: "Email Address",
      value: props.familyRepresentativeEmailAddress
    },
    {
      label: "Phone Number",
      value: props.familyRepresentativePhoneNumber
    },
    {
      label: "Relationship",
      value: props.representativeRelationship
    }];
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <label className={styles.bold}>Family Member Information</label>
      </div>
      <div className={styles.content}>
        {
          fields.map((obj) => (<div key={obj.label}>
            <label>{obj.label}</label>
            <span>{obj.value}</span>
          </div>))
        }
      </div>
    </div>
  );
}

export default FamilyMemberInfo;
