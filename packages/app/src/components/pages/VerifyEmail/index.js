import React from 'react'
import nominationsAPI from '../../../utils/API/nominationsAPI';

const VerifyEmail = () => {
    function sendValidationEmail () {
        nominationsAPI.validateEmail()
    }

    return (
        <div>
            <h4>Thank you for verifying your email!</h4>
        </div>
    )
}

export default VerifyEmail;
