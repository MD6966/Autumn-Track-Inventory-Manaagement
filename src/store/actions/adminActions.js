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

// ---------------ROLES-------------------------
export const  getRoles = () => async (dispatch) => {
  try{
    const res = await api.get('api/getAllRoles')
    dispatch({
      type:'GET_ROLES',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}

//----------------FACILITEIS---------------------

    export const  addFacility = (body) => async (dispatch) => {
      try{
        const res = await api.post('api/facilities', body)
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

    export const  getFacilities = () => async (dispatch) => {
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

    export const  getFacility = (id) => async (dispatch) => {
      try{
        const res = await api.get(`api/facilities/${id}`)
        dispatch({
          type:'GET_FACILITY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  deleteFacility = (id) => async (dispatch) => {
      console.log(id)
      try{
        const res = await api.delete(`api/facilities/${id}`)
        dispatch({
          type:'DEL_FACILITY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
    export const  updateFacility = (body,id) => async (dispatch) => {
      try{
        const res = await api.put(`api/facilities/${id}`, body)
        dispatch({
          type:'UPDATE_FACILITY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

  // ---------------CATEGORIES-------------------

    export const  getCategories = () => async (dispatch) => {
      try{
        const res = await api.get('api/categories')
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
        const res = await api.post('api/categories', body)
        dispatch({
          type:'ADD_CATEGORIES',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  deleteCategory = (id) => async (dispatch) => {
      console.log(id)
      try{
        const res = await api.delete(`api/categories/${id}`)
        dispatch({
          type:'DEL_CATEGORY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
    export const  getCategory = (id) => async (dispatch) => {
      try{
        const res = await api.get(`api/categories/${id}`)
        dispatch({
          type:'GET_CATEGORY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
    export const  updateCategory = (body,id) => async (dispatch) => {
      try{
        const res = await api.put(`api/categories/${id}`, body)
        dispatch({
          type:'UPDATE_CATEGORY',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
// ----------VENDORS---------------
    export const  getVendors = () => async (dispatch) => {
      try{
        const res = await api.get('api/vendors')
        dispatch({
          type:'GET_VENDORS',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

     export const  addVendor = (body) => async (dispatch) => {
     try{
        const res = await api.post('api/vendors', body)
        dispatch({
          type:'ADD_CATEGORIES',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  deleteVendor = (id) => async (dispatch) => {
      console.log(id)
      try{
        const res = await api.delete(`api/vendors/${id}`)
        dispatch({
          type:'DEL_VENDOR',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }
    export const  getVendor = (id) => async (dispatch) => {
      try{
        const res = await api.get(`api/vendors/${id}`)
        dispatch({
          type:'GET_VENDOR',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

    export const  updateVendor = (body,id) => async (dispatch) => {
      try{
        const res = await api.put(`api/vendors/${id}`, body)
        dispatch({
          type:'UPDATE_VENDOR',
          payload:res.data
        })
          return res
      }
      catch(err) {
        throw err
      }
    }

//-------------USERS-------------------

export const  getUsers = () => async (dispatch) => {
  try{
    const res = await api.get('api/users')
    dispatch({
      type:'GET_USERS',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}

export const  addUser = (body) => async (dispatch) => {
  try{
     const res = await api.post('api/users', body)
     dispatch({
       type:'ADD_USER',
       payload:res.data
     })
       return res
   }
   catch(err) {
     throw err
   }
 }

 export const  deleteUser = (id) => async (dispatch) => {
  try{
    const res = await api.delete(`api/users/${id}`)
    dispatch({
      type:'DEL_USER',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}

export const  getUser = (id) => async (dispatch) => {
  try{
    const res = await api.get(`api/users/${id}`)
    dispatch({
      type:'GET_USER',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}
export const  updateUser = (body,id) => async (dispatch) => {
  try{
    const res = await api.put(`api/users/${id}`, body)
    dispatch({
      type:'UPDATE_USER',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}


//--------------DAHSBOARD COUNT--------------


export const  getDashboardCounts = () => async (dispatch) => {
  try{
    const res = await api.get('api/getDashboardCounts')
    dispatch({
      type:'GET_COUNTS',
      payload:res.data
    })
      return res
  }
  catch(err) {
    throw err
  }
}