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
    const res = await axios.post(`${process.env.REACT_APP_URL}api/login`, body, {
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

    export const  addFacility = (body) => async (dispatch) => {
      try{
        const res = await api.post('api/facility', body)
        dispatch({
          type:'ADD_FACILITY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  getFacilities = (body) => async (dispatch) => {
      try{
        const res = await api.get('api/facilities')
        dispatch({
          type:'GET_FACILITIES',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  getCategories = () => async (dispatch) => {
      try{
        const res = await api.get('api/category')
        dispatch({
          type:'GET_CATEGORIES',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  addCategory = (body) => async (dispatch) => {
      try{
        const res = await api.post('api/category')
        dispatch({
          type:'GET_CATEGORIES',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
