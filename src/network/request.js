import axios from 'axios'

export default function request(config){
  const instance = axios.create({
    baseURL: 'http://202.112.157.40:8095',
    timeout: 5000,
  })
  return instance(config)
}
