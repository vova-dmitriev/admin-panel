import axios from 'axios'

const url = `${import.meta.env.VITE_URL}:${import.meta.env.VITE_API_PORT}`

const api = axios.create({
  baseURL: url,
})

export default api
