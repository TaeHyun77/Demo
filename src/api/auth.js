import api from './api';
// api.js 파일에서 만든 api 객체 사용


// 로그인, 회원가입, 사용자 정보-수정-탈퇴 등등

export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);

export const join = (data) => api.post(`/user/join`, data);

export const info = () => api.get(`/user/info`)

export const update = (data) => api.post(`/user/update`, data) // json 형식

export const remove = (username) => api.delete(`/user/${username}`)

export const board = (username) => api.delete(`/user/${username}`)

export const list = () => api.get("/user/AllUser");

export const postSave = (data) => api.post(`post/write`, data);
