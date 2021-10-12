import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const domainAPI = {
    addDomain: function() {
        return axios.post(`${API_URL}/api/createDomain`)
    }
}

export default domainAPI;