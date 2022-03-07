import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWE1ZjE3MDU5YTEwOTJlMWIxMDhmYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NjQzMTU3NCwiZXhwIjoxNjQ2NjkwNzc0fQ.nleFLP4dZ_SkmQb2IEUn7L6lrsdFyto_UoqVVNYG1xE'

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `BEARER ${TOKEN}`}
});