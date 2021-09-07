import React from 'react'
import axios from 'axios';

class VerifyEmail extends React.Component {
  
    state = {
        API_URL:  process.env.REACT_APP_API_URL,
        token: this.props.match.params.token,
    }

    componentDidMount() {
        axios.get(`${this.state.API_URL}/api/confirmation/${this.state.token}`)
    }

    render() {
        return (
            <div>
                <h4>Thank you for verifying your email!</h4>
            </div>
        )
    }
}    

export default VerifyEmail;
