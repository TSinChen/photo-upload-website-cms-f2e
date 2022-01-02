import axios from './axios'
import { Post, PostBody } from '../types/post'

const getPosts = async (): Promise<{ data: Post[] }> => await axios.get('/posts')
const uploadPost = async (body: PostBody) => await axios.post('/posts', body)
const deletePost = async (id: Post['_id']) => await axios.delete(`/posts/${id}`)

export default {
  getPosts,
  uploadPost,
  deletePost,
}
