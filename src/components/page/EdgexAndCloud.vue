<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item><i class='el-icon-lx-calendar'></i> 云边协同</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='container'>
      <el-row  style="margin-top: 20px;margin-bottom: 30px;">
        <el-col :span="11" style="margin-left: 15px">
          <div style="float: left">
            <el-button type="primary" icon="el-icon-guide" @click="">在线设备</el-button>
            <el-select v-model="deviceIndex" placeholder="请选择设备">
              <el-option v-for="(item, i) in deviceList" :key="i" :label="item.name" :value="i"></el-option>
            </el-select>
            <el-button type="primary" @click="drawCharts () ">确定</el-button>
          </div>
        </el-col>
        <el-col :span="11" style="margin-left: 5%">
          <div style="float: right">
            <el-button type="primary" icon="el-icon-guide">更新周期</el-button>
            <el-select v-model="interval" placeholder="请选择更新周期">
              <el-option v-for="item in intervals" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <div id="detailchart" style="width: 1200px;height:600px;margin-top: 20px;margin-left: 10%"></div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../network/request';
import echarts from 'echarts';

export default {
  name: 'edgexandcloud',
  data: function() {
    return {
      query: {
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      deviceIndex: '',
      deviceId: '',
      deviceName: '',
      deviceList: [
        { name: '' }
      ],
      time: '',
      interval: 1000,
      intervals: [
        { label: '1秒', value: 1000 },
        { label: '3秒', value: 3000 },
        { label: '5秒', value: 5000 },
        { label: '10秒', value: 10000 },
        { label: '20秒', value: 20000 },
        { label: '30秒', value: 30000 }
      ],
      myChart: '',
      option: {
        title: {
          text: '装备实时信息',
          left: 'center',
          textStyle: {
            fontSize: 22
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          name: '时间'
        },
        yAxis: {},
        legend: {
          left: 200,
          bottom: 0,
          itemHeight: 28,
          itemWidth: 70
        },
        series: []
      },
      dataForm: {
        type: []
      },
      len: 0
    };
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
    }
  },
  components: {},
  methods: {
    drawCharts () {
      let date1 = new Date()
      // 实际API
      // this.$axios.get('http://localhost:8081/api/details/' + this.gwip + '/' + id).then(resp => {
      // kong网关代理API
      request({
        url: 'http://202.112.157.40:8333/api/cloud/data',
        method: 'get'
      }).then(resp => {
        // this.$axios.get('http://localhost:8000/d/details/' + this.gwip + '/' + id).then(resp => {
        // 开发模式下代理API
        // this.$axios.get('/devices/details/' + this.gwip + '/' + id).then(resp => {
        this.len = Object.keys(resp.data).length
        for (let i = 0; i < this.len; i++) {
          let item = 'data' + (i + 1)
          this.dataForm[item] = []
          this.option.series.push({
            name: '',
            type: 'line',
            data: [],
            connectNulls: true,
            symbol: 'emptyTriangle',
            symbolSize: 6,
            lineStyle: {
              width: 2
            }
          })
        }
        if (resp && resp.status === 200) {
          this.dataForm.type = Object.keys(resp.data)
          for (let i = 0; i < this.len; i++) {
            let item = 'data' + (i + 1)
            this.dataForm[item].push([date1, resp.data[this.dataForm.type[i]]])
          }
          // if (this.dataForm['data1'].length > 60) {
          //   for (let i = 0; i < this.len; i++) {
          //     let item = 'data' + (i + 1)
          //     this.dataForm[item].shift()
          //   }
          // }
          for (let i = 0; i < this.len; i++) {
            let item = 'data' + (i + 1)
            this.option.series[i].name = this.dataForm.type[i]
            this.option.series[i].data = this.dataForm[item]
          }
        }
        this.myChart = echarts.init(document.getElementById('detailchart'), 'macarons')
        // this.myChart.clear()
        // this.myChart.setOption(this.option)
        this.setTime(this.interval)
      })
    },
    setTime (time) {
      this.time = setInterval(() => {
        let date = new Date()
        // 实际API
        // this.$axios.get('http://localhost:8081/api/details/' + this.gwip + '/' + id).then(resp => {
        // kong网关代理API
        request({
          url: 'http://202.112.157.40:8333/api/cloud/data',
          method: 'get'
        }).then(resp => {
          // this.$axios.get('http://localhost:8000/d/details/' + this.gwip + '/' + id).then(resp => {
          // 开发模式下代理API
          // this.$axios.get('/devices/details/' + this.gwip + '/' + id).then(resp => {
          if (resp && resp.status === 200) {
            for (let i = 0; i < this.len; i++) {
              let item = 'data' + (i + 1)
              this.dataForm[item].push([date, resp.data[this.dataForm.type[i]]])
            }
            if (this.dataForm['data1'].length > 60) {
              for (let i = 0; i < this.len; i++) {
                let item = 'data' + (i + 1)
                this.dataForm[item].shift()
              }
            }
            for (let i = 0; i < this.len; i++) {
              let item = 'data' + (i + 1)
              this.option.series[i].data = this.dataForm[item]
            }
            this.myChart.setOption(this.option)
          }
        })
      }, time)
    },
    clear () {
      this.dialogFormVisible = false
    }
  },
  watch: {
    interval: function (newValue, oldValue) {
      clearInterval(this.time)
      this.setTime(newValue)
    }
  }
};
</script>
<style scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>