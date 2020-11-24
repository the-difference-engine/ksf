import React from "react";
import styles from "./styles.module.css";

function FamilyMemberInfo(props) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <label className={styles.bold}>Family Member Information</label>
      </div>
      <div className={styles.content}>
        {
          props.fields.map((obj) => (<div key={obj.label}>
            <label>{obj.label}</label>
            <span>{obj.value}</span>
          </div>))
        }
      </div>
    </div>
  );
}

export default FamilyMemberInfo;
