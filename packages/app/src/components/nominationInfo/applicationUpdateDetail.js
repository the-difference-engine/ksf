import React from "react";
import styles from "./styles.module.css";

function ApplicationUpdateDetail(props) {
    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <label className={styles.bold}>{props.title}</label>
            </div>
            {
            props.title == "Patient Information" ? <div>
                <form>
                <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                    <div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                <label className={styles.label}>{obj.label}</label>
                                {/* <input className={styles.value}>{obj.value}</input> */}
                                <input name={obj.label}onChange={(e) => handleChange(e)} type="text" defaultValue={obj.value}/>
                            </div>
                    </div>
                </form>
            </div>
                :   <form>
                    <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
                        {
                            props.fields.map((obj) => (<div key={obj.label} className={obj.label === "" ? styles.mobileHide : ""}>
                                <label className={styles.label}>{obj.label}</label>
                                {/* <input className={styles.value}>{obj.value}</input> */}
                                <input name={obj.label}onChange={(e) => handleChange(e)} type="text" defaultValue={obj.value}/>
                            </div>))
                        }
                    </div>
                </form>
            }

        </div>
    );
}

export default ApplicationUpdateDetail;