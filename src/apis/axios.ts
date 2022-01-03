import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://photo-upload-website-cms-b2e.herokuapp.com/',
})
