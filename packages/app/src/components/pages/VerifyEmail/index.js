import React, { useEffect } from 'react'
import utilsAPI from '../../../utils/API/nominationsAPI.js';

const VerifyEmail = (props) => {
  
    const token = props.match.params.token

    useEffect(()=> {
        utilsAPI.validateEmail(token)
    });

    return (
        <div>
            <h4>Thank you for verifying your email!</h4>
        </div>
    )
}    

export default VerifyEmail;