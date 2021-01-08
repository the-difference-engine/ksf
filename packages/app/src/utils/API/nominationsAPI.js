import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

const cleanURL = (str) => {
  if (str.endsWith('/')) {
    return str.slice(0, -1);
  }
  else return str;
}

const nominationsAPI = {
  getNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/nominations`);
  },
  fetchNomination: function (id) {
    return axios.get(`${cleanURL(API_URL)}/api/nominations/${id}`);
  },
};

export default nominationsAPI;
