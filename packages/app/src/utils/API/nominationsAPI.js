import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const cleanURL = str => {
  if (str && str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str;
};

const nominationsAPI = {
  getNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/nominations`);
  },
  fetchNomination: function (id) {
    return axios.get(`${cleanURL(API_URL)}/api/nominations/${id}`);
  },
  updateNomination: function (id, value) {
    return axios.put(`${cleanURL(API_URL)}/api/nominations/${id}`, {
      status: value,
    });
  },
  updateActiveNomData: function (id, nomChangeData) {
    return axios.patch(`${cleanURL(API_URL)}/api/nominations/${id}`, {
      ...nomChangeData,
    });
  },
  syncNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/syncnominations`);
  },
  validateEmail: function (token) {
    return axios.post(`${cleanURL(API_URL)}/api/confirmation/${token}`);
  }
};

export default nominationsAPI;
