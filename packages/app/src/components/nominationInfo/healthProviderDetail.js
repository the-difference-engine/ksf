import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function HealthProviderDetail(props) {
      return (
        <div className={styles.main}>
          <div className={styles.header}>
          <label className={styles.bold}>{props.title}</label>
          </div>
          <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
   
            {
              props.fields.map((obj) =>  obj.label === "Provider Name" ? (<div key={obj.label} className={obj.label === "" ? styles.mobileHide: ""}>
                    <label>{obj.label}</label>
                    <Link to={"/searchresults"}>
                    <span>{String(obj.value)}</span>
                    </Link></div>) 
                    : (<div key={obj.label} className={obj.label === "" ? styles.mobileHide: ""}>
                    <label>{obj.label}</label>
                    <span>{String(obj.value)}</span>
                    </div>))
            }
          </div>
        </div>
      );
    }
  
  export default HealthProviderDetail;



