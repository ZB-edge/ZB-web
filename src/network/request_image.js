import axios from "axios";
import Global from '@/components/common/global'
export default function request_image(config){
  const instance1 = axios.create({
    baseURL: 'http://'+ Global.ip +':8100/api/damage/',
    timeout: 5000,
  })
  return instance1(config)
}