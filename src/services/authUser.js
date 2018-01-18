import axios from 'axios';

export default {
  auth(data) {
    return axios.post(
      '/api/auth-user',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } },
    )
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
  registration(data) {
    return axios.post(
      '/api/registration-new-user',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } },
    )
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
};
