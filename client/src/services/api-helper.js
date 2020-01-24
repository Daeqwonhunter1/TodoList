import axios from 'axios'

const api = axios.create({
  baseURL: "https://shielded-waters-99443.herokuapp.com/"
})


///Auth//
export const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/user/login', loginData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    localStorage.setItem('authToken', resp.data.token);
    return resp.data.user
  } catch (e) {
    return {
      error: "invalid credentials"
    }
  }
}

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/user/register', registerData);
    localStorage.setItem('authToken', resp.data.token);
    return resp.data.user
  } catch (e) {
    return {
      error: "invalid credentials"
    }
  }
}



export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/user/verify')
    return resp.data
  }
  return false
}




/////Show Posts//////
export const showPosts = async () => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.get('/posts')

  return resp.data
}

export const showOnePost = async (postId) => {
  const resp = await api.get(`/posts/${postId}`)
  return resp
}
////Create Posts////
export const createPost = async (postData) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.post('/posts', postData)
  return resp
}
///Update Post///
export const updatePost = async (postId, postData) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.put(`/posts/${postId}`, postData)
  return resp
}
///Delete Post////
export const deletePost = async (postId) => {
  const token = localStorage.getItem('authToken');
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.delete(`/posts/${postId}`)
  return resp
}