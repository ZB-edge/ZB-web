<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-global"></i> 车辆管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col style="width: 49%">
        <el-card shadow='hover'>
          <div slot='header' class='clearfix'>
            <span>车辆驶入</span>
            <el-button type="primary" style="float: right" @click="uploadin">一键上传</el-button>
          </div>
          <el-table :data='org_info' height='250' border :row-style="{height: '35px'}"
                    style='width: 100%'>
            <el-table-column type="index" label='序号' align="center"></el-table-column>
            <el-table-column prop='incar' label='车辆名称' align="center"></el-table-column>
            <el-table-column prop='instatus' label='信息状态' align="center"></el-table-column>
            <el-table-column prop='intime' label='驶入时间' show-overflow-tooltip align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span='11' style="float: right;width: 49%">
        <el-card shadow='hover'>
          <div slot='header' class='clearfix'>
            <span>车辆驶出</span>
            <el-button type="primary" style="float: right" @click="uploadout">一键上传</el-button>
          </div>
          <el-table :data='org_outfo' height='250' border :row-style="{height: '35px'}"
                    style='width: 100%'>
            <el-table-column type="index" label='序号' align="center"></el-table-column>
            <el-table-column prop='outcar' label='车辆名称' align="center"></el-table-column>
            <el-table-column prop='outstatus' label='信息状态' align="center"></el-table-column>
            <el-table-column prop='outtime' label='驶出时间' show-overflow-tooltip align=""></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class='container' style="margin-top: 10px">
      <div>
        <div id='in'>
        </div>
      </div>
      <div>
        <div id='out'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sector from '@/components/page/sectorfacility';
import sectorequip from '@/components/page/sectorequip';
import echarts from 'echarts';
import request from "@/network/request";

export default {
  name: 'basecharts',
  components: {
    sector, sectorequip
  },
  data() {
    return {
      org_info:[],
      org_outfo:[],
      value: '',
      option: {
        title: {
          text: '车辆驶入情况',
          left: 'center',
          top: '5%'
        },
        color: ['#f44'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {c}',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto'
              // formatter: '{value} %'
            },
            show: true
            // min:0,
            // max:100
          }
        ],
        series: [
          {
            name: 'ECharts例子个数统计',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: 'top'
                  // formatter: '{b}\n{c}%'　　　　//这是关键，在需要的地方加上就行了
                  // formatter: '{c}%'
                }
              }
            },
            data: []
          }
        ]
      },
      option1: {
        title: {
          text: '车辆驶出情况',
          left: 'center',
          top: '5%'
        },
        color: ['#f44'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {c}',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto'
              // formatter: '{value} %'
            },
            show: true
            // min:0,
            // max:100
          }
        ],
        series: [
          {
            name: 'ECharts例子个数统计',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: 'top'
                  // formatter: '{b}\n{c}%'　　　　//这是关键，在需要的地方加上就行了
                  // formatter: '{c}%'
                }
              }
            },
            data: []
          }
        ]
      }
    };
  },
  methods:{
    uploadin(){
      request({
      method: 'post',
      baseURL:'http://202.112.157.52:8101',
      url:'/api/vehicle/exportIn/' + localStorage.getItem("ms_username")
    }).then(res => {
      for (let i = 0;i < this.org_info.length; i++){
        let incar = this.org_info[i];
        incar['instatus'] = '已上传';
      }
      })
    },
    uploadout(){
      request({
      method: 'post',
      baseURL:'http://202.112.157.52:8101',
      url:'/api/vehicle/exportOut/' + localStorage.getItem("ms_username")
    }).then(res => {
      for (let i = 0;i < this.org_outfo.length; i++){
        let outcar = this.org_outfo[i];
        outcar['outstatus'] = '已上传';
      }
      })
    }
  },
  created() {
    this.centerDialogVisible = true;
  },
  mounted() {
    request({
      method: 'get',
      baseURL:'http://202.112.157.52:8101',
      url:'/api/vehicle/sum/' + localStorage.getItem("ms_username")
    }).then(res => {
      console.log(res.data);
      let out = res.data['车辆驶出情况'];
      let keys = Object.keys(out);
      let val = Object.values(out);
      this.option1.xAxis[0].data = keys;
      this.option1.series[0].data = val;
      let vehicle_in = res.data['车辆驶入情况'];
      let keys1 = Object.keys(vehicle_in);
      let val1 = Object.values(vehicle_in);
      this.option.xAxis[0].data = keys1;
      this.option.series[0].data = val1;
      console.log(this.option1.series[0].data);
      console.log(this.option1.xAxis[0].data);
      let this_ = this;
    let myChart = echarts.init(document.getElementById('in'));
    myChart.setOption(this.option);
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener('resize', function() {
      myChart.resize();
    });
    let myChart1 = echarts.init(document.getElementById('out'));
    myChart1.setOption(this.option1);
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener('resize', function() {
      myChart1.resize();
    });
    })
    request({
      method: 'get',
      baseURL:'http://202.112.157.52:8101',
      url:'/api/vehicle/list/' + localStorage.getItem("ms_username")
    }).then(res => {
      console.log(res.data);
      let datas = [];
      let incar = res.data[0]
      for (let i = 0;i < incar.length; i++){
       const arr = {};
       arr['incar'] = incar[i]['license'];
       arr['intime'] = incar[i]['date'];
       arr['instatus'] = '未上传';
       datas.push(arr);
      }
      this.org_info = datas;
      let datas1 = [];
      let outcar = res.data[1]
      for (let i = 0;i < outcar.length; i++){
       const arr = {};
       arr['outcar'] = outcar[i]['license'];
       arr['outtime'] = outcar[i]['date'];
       arr['outstatus'] = '未上传';
       datas1.push(arr);
      }
      this.org_outfo = datas1;
      console.log(this.org_info)
    })
  }
};
</script>

<style scoped>
#in {
  display: inline-block;
  left: 0;
  width: 50%;
  height: 350px;
  margin: 0 auto;
  float: left;
}

#out {
  right: 0;
  display: inline-block;
  width: 50%;
  height: 350px;
  margin: 0 auto;
}
</style>