import React, { useEffect, useState } from 'react'
import utilsAPI from '../../../utils/API/nominationsAPI.js';

const VerifyEmail = (props) => {
  
    const token = useState(props.match.params.token)

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