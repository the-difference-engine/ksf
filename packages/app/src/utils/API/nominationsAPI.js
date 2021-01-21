import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

const cleanURL = (str) => {
  if (str && str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str
}

const nominationsAPI = {
  getNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/nominations`);
  },
  fetchNomination: function (id) {
    return axios.get(`${cleanURL(API_URL)}/api/nominations/${id}`);
  },
  updateNomination: function (id, value) {
    return axios.put(`/nominations/${id}`, {
      status: value
    });
  },
};

export default nominationsAPI;
