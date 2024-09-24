import api from './api';
// api.js 파일에서 만든 api 객체 사용


// api 모음


// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);

// 회원가입
export const join = (data) => api.post(`/user/join`, data);

// 유저 정보
export const info = () => api.get(`/user/info`)

// 유저 정보 수정
export const update = (data) => api.post(`/user/update`, data) // json 형식

// 유저 정보 삭제
export const remove = (username) => api.delete(`/user/${username}`)

export const board = (username) => api.delete(`/user/${username}`)

// 유저 리스트
export const list = () => api.get("/user/AllUser");


// 게시물 상세
export const postInfo = (id) => api.get(`/post/info/${id}`);

// 게시물 저장
export const postSave = (data) => api.post(`post/write`, data);

// 게시물 리스트
export const postList = () => api.get("/post/AllPost");

// 게시물 삭제
export const removePost = (id) => api.delete(`/post/${id}`)

// 게시물 업데이트
export const updatePost = (data) => api.post(`/post/update`, data) // json 형식


export const CommentList = (id) => api.get(`/post/AllComment/${id}`);

export const addComment = (postId, data) => api.post(`/post/${postId}/comment`, data); 
