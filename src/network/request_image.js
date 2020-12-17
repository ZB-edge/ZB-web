import axios from "axios";

export default function request_image(config){
  const instance1 = axios.create({
    baseURL: 'http://localhost:8100/api/damage/show',
    timeout: 5000,
  })
  return instance1(config)
}