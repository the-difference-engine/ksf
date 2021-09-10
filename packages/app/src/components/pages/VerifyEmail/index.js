import React, { useEffect, useState } from 'react'
import axios from 'axios';

const VerifyEmail = (props) => {
  
    const apiUrl = useState(process.env.REACT_APP_API_URL)
    const token = useState(props.match.params.token)

    useEffect(()=> {
        axios.get(`${apiUrl}/api/confirmation/${token}`)
    });

    return (
        <div>
            <h4>Thank you for verifying your email!</h4>
        </div>
    )
}    

export default VerifyEmail;