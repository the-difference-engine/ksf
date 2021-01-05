import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/api/nominations');
  },
  fetchNomination: function (id) {
    return axios.get(`/api/nominations/${id}`);
  },
};

export default nominationsAPI;
