import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const domainAPI = {
    addDomain: function(domain) {
        return axios.post(`${API_URL}/api/createDomain`, domain)
    },

    findDomains: function() {
        return axios.get(`${API_URL}/api/domains`)
    }
}

export default domainAPI;