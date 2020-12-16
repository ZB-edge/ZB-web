import axios from 'axios'

export default function request(config){
  const instance = axios.create({
    baseURL: 'http://localhost:8095',
    timeout: 5000,
  })
  return instance(config)
}
