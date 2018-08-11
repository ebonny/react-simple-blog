import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';   // 블로그 CRUD 를 테스트할 수 있게 지원해주는 사이트.
const API_KEY = '?key=jdk12kdj78';                       // key 는 각 사용자마다 유일한 랜덤값이면 된다.

export function fetchPosts() {
   const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

   return {
      type: FETCH_POSTS,
      payload: request
   };
}

export function createPost(values, callback) {
   const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
         .then(() => callback());

   return {
      type: CREATE_POST,
      payload: request
   }
}

export function fetchPost(id) {
   const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

   return {
      type: FETCH_POST,
      payload: request
   };
}

export function deletePost(id, callback) {
   const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
         .then( () => callback() );
   return {
      type: DELETE_POST,
      payload: id
   }
}