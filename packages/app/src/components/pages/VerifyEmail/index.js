import React from 'react'
import nominationsAPI from '../../../utils/API/nominationsAPI';

const VerifyEmail = () => {
    function sendValidationEmail () {
        nominationsAPI.validateEmail()
    }

    return (
        <div>
            <h2>Thank you for verifying your email!</h2>
        </div>
    )
}

export default VerifyEmail
