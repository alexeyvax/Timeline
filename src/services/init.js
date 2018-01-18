import axios from 'axios';

export default {
  loadData(login, token) {
    return axios.get('/api/init-load-data', {
      params: { login },
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
};
