import axios from 'axios';

export default {
  addDay(data, token) {
    return axios.post(
      '/api/add-new-fill-day',
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
  removeDay(login, employee, id, token) {
    return axios.delete(`/api/remove-fill-day/${id}`, {
      params: {
        login,
        employee,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then(res => res.data)
      .catch((error) => { throw error.response; });
  },
  saveHours(data, token) {
    return axios.put(
      `/api/save-hours/${data.fillDayId}`,
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
