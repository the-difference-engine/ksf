import React from "react";
import styles from "./styles.module.css";

function FamilyMemberInfo(props) {
  const titles = ["Name", "Email Address", "Phone Number", "Relationship"];
  const values = [props.familyRepresentativeName, props.familyRepresentativeEmailAddress, props.familyRepresentativePhoneNumber, props.representativeRelationship];

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.bold}>Family Member Information</span>
      </div>
      <div className={styles.content}>
        {
          titles.map((title, i) => (<div key={title}>
            <span>{title}</span>
            <span>{values[i]}</span>
          </div>))
        }
      </div>
    </div>
  );
}

export default FamilyMemberInfo;
