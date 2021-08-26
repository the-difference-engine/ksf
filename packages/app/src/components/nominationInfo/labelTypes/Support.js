import React from 'react';
import styles from '../newstyles.module.css';

const Support = props => {
    const list = props.formData.split(",").map((expense)=>{
        return (<li key = {expense}>{expense}</li>)
          })
    return <ul className={styles.grantList}>{list}</ul>
}

export default Support;