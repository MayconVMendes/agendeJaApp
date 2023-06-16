import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-44-212-39-218.compute-1.amazonaws.com:5000/agenda/'
});


export default api;