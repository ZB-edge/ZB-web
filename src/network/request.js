import axios from 'axios'
import global from "@/network/global";

export default function request(config){
  const instance = axios.create({
    baseURL: 'http://' + global.ip + ':8095',
    timeout: 5000,
  })
  return instance(config)
}
