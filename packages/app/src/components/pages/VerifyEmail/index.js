import React from 'react'
import axios from 'axios';

const VerifyEmail = (props) => {

    const API_URL = process.env.REACT_APP_API_URL;
    const token = props.match.params.token;

    axios.get(`${API_URL}/api/confirmation/${token}`)

    return (
        <div>
            <h4>Thank you for verifying your email!</h4>
        </div>
    )
}

export default VerifyEmail;
