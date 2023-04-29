import { post, get } from '../axios.ts'

// post
export const userLogin = (data: any) => post('/api/v1/auth/authenticate', data)

// get
export const getUser = (params: any) => get('/user/list', params)
