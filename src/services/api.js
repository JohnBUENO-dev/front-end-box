import axios from 'axios';

const api = axios.create({
  baseURL: "https://box-teste-1.herokuapp.com/"

});

export default api;