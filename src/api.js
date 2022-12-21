import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
export default instance;
