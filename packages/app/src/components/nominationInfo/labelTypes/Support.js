import React from 'react';
import styles from '../newstyles.module.css';

const Support = props => {
    console.log(props.formData, "support comp")
    const list = props.formData.split(",").map((expense)=>{
        return (<li>{expense}</li>)
          })
          
    return(
        <div >
            <ul>{list}</ul>
        </div>
    )
    // return <div></div>
}

export default Support;