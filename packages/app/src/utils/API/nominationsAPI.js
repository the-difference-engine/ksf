import axios from 'axios';

const nominationsAPI = {
  getNominations: function () {
    return axios.get('/nominations');
  },
};

export default nominationsAPI;
