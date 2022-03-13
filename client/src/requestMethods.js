import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_DEV_BASE_URL;

function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('='); 
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

const TOKEN = getCookie('jwt'); 

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `Bearer ${TOKEN}`}
});