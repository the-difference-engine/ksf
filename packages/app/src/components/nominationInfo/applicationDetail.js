import React from "react";
import styles from "./styles.module.css";

const ApplicationDetail = (props) => {
      return (
        <div className={styles.main}>
          <div className={styles.header}>
          <label className={styles.bold}>{props.title}</label>
          </div>
          <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
            {
              props.propsData.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide: ""}>
                <label className={styles.label}>{obj.label}</label>
                <span className={styles.value}>{String(obj.value)}</span>
              </div>))
            }
          </div>
        </div>
      );
    }
  
  export default ApplicationDetail;
