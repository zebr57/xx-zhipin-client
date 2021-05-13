import {
	reqRegister,
	reqLogin,
	reqUpdateUser,
	reqGetUser,
} from '../../api/index'
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
} from '../actions-type'

const authSuccess = data => ({type: AUTH_SUCCESS, data})
const errorMsg = data => ({type: ERROR_MSG, data})

const receiveUser = data => ({type:RECEIVE_USER, data})
export const resetUser = data => ({type:RESET_USER, data})

export const register = (user) => {
	const { username,password,password2,type } = user 
	if(password !== password2) return dispath => {dispath(errorMsg('两次密码不一致'))} //验证表单
	return async dispath => {
		const response = await reqRegister({ username,password,type })
		const res = response.data
		if (res.code === 0) {
			dispath(authSuccess(res.data))
		} else {
			dispath(errorMsg(res.msg))
		}
	}
}

export const login = (user) => {
	return async dispath => {
		const response = await reqLogin(user)
		const res = response.data
		if (res.code === 0) {
			dispath(authSuccess(res.data))
		} else {
			dispath(errorMsg(res.msg))
		}
	}
}

export const updateUser = (user) => {
	return async dispath => {
		const response = await reqUpdateUser(user)
		const res = response.data
		if (res.code === 0) {
			dispath(receiveUser(res.data))
		} else {
			dispath(resetUser(res.msg))
		}
	}
}

export const getUser = (user) => {
	return async dispath => {
		const response = await reqGetUser(user)
		const res = response.data
		if (res.code === 0) {
			dispath(receiveUser(res.data))
		} else {
			dispath(resetUser(res.msg))
		}
	}
}