import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const cleanURL = (str) => {
  if (str && str.endsWith('/')) {
    return str.slice(0, -1);
  }
  return str;
};

const apiEndpoint = `${cleanURL(API_URL)}/api/grantcycles`;

const grantCycleAPI = {
  getGrantCycles: function () {
    return axios.get(apiEndpoint);
  },

  createGrantCycle: function (grantCycle) {
    return axios.post(apiEndpoint, grantCycle);
  },

  updateGrantCycle: function (grantCycle) {
    console.log('grant cycle in api util', grantCycle);
    return axios.put(`${apiEndpoint}/${grantCycle.id}`, grantCycle);
  },

  getActiveGrantCycle: function () {
    return axios.get(`${apiEndpoint}/findactive`);
  },
};

export default grantCycleAPI;
