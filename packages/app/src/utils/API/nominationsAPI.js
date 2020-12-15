import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/nominations');
  },
  fetchNomination: function (id) {
    return axios.get(`/nominations/${id}`);
  },
  updateNomination: function (id, w) {
    return axios.put(`/nominations/${id}`, {
      status: w
    });
  },
};

export default nominationsAPI;
