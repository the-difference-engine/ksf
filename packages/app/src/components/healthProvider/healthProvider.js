import React from "react";
import styles from "./styles.module.css";

function HealthProvider(props) {
      return (
        <div className={styles.main}>
          <div className={styles.header}>
            <label className={styles.bold}>Health Provider Information</label>
          </div>
          <div className={[styles.content, styles["grid-container"]].join(" ")}>
            {
              props.fields.map((obj) => (<div key={obj.label}>
                <label>{obj.label}</label>
                <span>{String(obj.value)}</span>
              </div>))
            }
          </div>
        </div>
      );
    }
  
  export default HealthProvider;