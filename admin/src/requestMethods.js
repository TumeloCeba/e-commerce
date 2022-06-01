import axios from 'axios';

let TOKEN;

try{
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.jwt;
} catch(error){
  console.log(error);
}

export const publicRequest = axios.create({
  baseURL: '/api',
});

export const userRequest = axios.create({
  baseURL: '/api',
  headers: {'Authorization': `Bearer ${TOKEN}`}
});
