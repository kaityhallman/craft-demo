import axios from 'axios';

export function saveFieldBuilder(json) {
  return post(process.env.REACT_APP_API_URL, json);
}

function post(url, body) {
  return axios.post(`${url}`, body)
    .then(onSuccess)
    .catch(onError);
}

function onSuccess(response) {
  let result;

  if (response.status !== 204) {
    result = response.data;
  } else {
    result = 'Success';
  }
  return result;
}

function onError(error) {
  const returnedError = error && error.response && error.response.data;
  throw returnedError;
}

export default {
  saveFieldBuilder,
}
