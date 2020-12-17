import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/nominations');
  },
  fetchNomination: function (id) {
    return axios.get(`/nominations/${id}`);
  },
};

export default nominationsAPI;
