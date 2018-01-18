import axios from 'axios';

export default {
  add(data, token) {
    return axios.post(
      `/api/add-new-${data.type}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      },
    )
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
  remove(data, token) {
    return axios.delete(`/api/remove-${data.type}/${data.id}`, {
      params: {
        login: data.login,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
  save(data, token) {
    return axios.put(
      `/api/save-name-${data.type}/${data.id}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      },
    )
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
};
