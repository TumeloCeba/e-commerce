import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

const TOKEN = getCookie('jwt'); //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWE1ZjE3MDU5YTEwOTJlMWIxMDhmYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NjQzMTU3NCwiZXhwIjoxNjQ2NjkwNzc0fQ.nleFLP4dZ_SkmQb2IEUn7L6lrsdFyto_UoqVVNYG1xE'

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `Bearer ${TOKEN}`}
});