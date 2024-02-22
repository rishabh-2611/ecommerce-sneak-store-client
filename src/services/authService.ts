import axios from 'axios';

const login = async (email:string, password:string) => axios.post('/login', { email, password });

const register = async (firstName:string, lastName:string, email:string, password:string, type:string) => axios.post('/register', {
    firstName,
    lastName,
    email,
    password,
    type,
  });

const logout = async () => axios.post('/logout');

export default {
  login,
  register,
  logout,
};
