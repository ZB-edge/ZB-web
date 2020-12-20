import axios from 'axios'
import Global from '@/components/common/global'

export default function request(config){
  const instance = axios.create({
    baseURL: 'http://'+ Global.ip +':8095',
    timeout: 5000,
  })
  return instance(config)
}
