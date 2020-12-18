import axios from "axios";

export default function request_image(config){
  const instance1 = axios.create({
    baseURL: 'http://202.112.157.40:8100/api/damage/',
    timeout: 5000,
  })
  return instance1(config)
}