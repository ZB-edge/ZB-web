<template>
  <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import request from "@/network/request";
  export default {
    name: 'charset',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    created() {
      request({
  url:'/home/multidata'
    }).then(res =>{
      // console.log(res.data.data.banner.list[0].title)
              this.options[0].label = res.data.data.banner.list[0].title;
    }).catch(err => {
  alert('获取数据失败！')
    })

      // console.log(this.options[0].label)
    }
  }
</script>