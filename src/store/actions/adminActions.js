import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const getToken = () => {
  return localStorage.getItem('token');
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const adminLogin = ({ email, password }) => async (dispatch) => {
  const body = {
    email,
    password,
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}api/login?email=${email}&password=${password}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });

    return res ;
  } catch (err) {
    // Handle the error
    throw err;
  }
};


export const adminLogOut = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT_SUUCCESS'
      });
    }