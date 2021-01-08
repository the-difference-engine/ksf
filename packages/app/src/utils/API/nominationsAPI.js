import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

const nominationsAPI = {
  getNominations: function () {
    return axios.get(`${API_URL}/api/nominations`);
  },
  fetchNomination: function (id) {
    return axios.get(`${API_URL}/api/nominations/${id}`);
  },
  updateNomination: function (id, value) {
    return axios.put(`/nominations/${id}`, {
      status: value
    });
  },
};

export default nominationsAPI;
