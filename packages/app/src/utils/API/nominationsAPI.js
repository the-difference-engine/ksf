import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/nominations');
  },
  fetchNomination: function (id) {
    return axios.get(`/nomination/${id}`);
  }
};

export default nominationsAPI;
