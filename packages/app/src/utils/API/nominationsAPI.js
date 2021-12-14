import axios from 'axios';
import Cookies from 'universal-cookie';

const API_URL = process.env.REACT_APP_API_URL;
const cookies = new Cookies();
const gAuth = cookies.get('gAuth')
const config = {
  headers: {
    Authorization: "Bearer " + gAuth + " " + process.env.REACT_APP_GOOGLE_CLIENT_ID
 }
}

const cleanURL = (str) => {
  if (str && str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str;
};




const nominationsAPI = {
  getNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/nominations`, config);
  },
  fetchNomination: function (id) {
    return axios.get(`${cleanURL(API_URL)}/api/nominations/${id}`, config);
  },
  updateNomination: function (id, value) {
    return axios.put(`${cleanURL(API_URL)}/api/nominations/${id}`, {
      status: value,
    }, config);
  },
  updateActiveNomData: function (id, nomChangeData) {
    return axios.patch(`${cleanURL(API_URL)}/api/nominations/${id}`, {
      ...nomChangeData,
    }, config);
  },
  syncNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/syncnominations`, config);
  },
  checkNominations: function () {
    return axios.get(`${cleanURL(API_URL)}/api/checknominations`, config);
  },
  validateEmail: function (token) {
    return axios.post(`${cleanURL(API_URL)}/api/confirmation/${token}`, config);
  },
  resendEmail: function(id, recipient, emailType) {
    return axios.post(`${cleanURL(API_URL)}/api/nominations/${id}`, {
      recipient, emailType
    }, config);
  }
};

export default nominationsAPI;
