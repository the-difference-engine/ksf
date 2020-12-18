import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/nominations');
  },
  fetchNomination: function (id) {
    return axios.get(`/nominations/${id}`);
  },
  updateNomination: function (id, value) {
    return axios.put(`/nominations/${id}`, {
      status: value
    });
  },
};

export default nominationsAPI;
