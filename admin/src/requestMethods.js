import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_DEV_BASE_URL;
 
//console.log('requestMethod', process.env);
  
/*function getCookie(cookieName) {
  let cookie = {}; 
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}*/ 

let TOKEN;

try{
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.jwt;
} catch(error){
  console.log(error);
}
//console.log('token',TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {'Authorization': `Bearer ${TOKEN}`}
});
