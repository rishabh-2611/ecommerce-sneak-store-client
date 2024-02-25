import axios from 'axios';
// eslint-disable-next-line no-undef
const serverApp = `${process.env.SERVER_APP}/api/v1`;

axios.defaults.baseURL = serverApp;
axios.defaults.withCredentials = true;
