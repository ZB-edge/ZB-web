<template>
  <div>
    <el-dialog
      title='单位信息'
      :visible.sync='centerDialogVisible'
      width='30%'
      :show-close='false'
      :close-on-click-modal='false'
      center>
      <p style='display: inline;margin-left: 60px'>单位名称：</p>
      <el-select v-model='value' filterable placeholder='请选择单位名称' style='margin-left: 5px'>
        <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
      <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='sure'>确 定</el-button>
    <el-button @click='cancel'>取 消</el-button>
  </span>
    </el-dialog>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class='el-icon-lx-global'></i> 车辆分析
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-show='!centerDialogVisible' class='container'>
      <h3 style='margin-bottom: 20px'>单位：{{ value }}</h3>
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
import bus from '@/components/common/bus';
import request from '@/network/request';
import Global from '@/components/common/global';
export default {
  name: 'basecharts',
  components: {
    sector, sectorequip
  },
  data() {
    return {
      centerDialogVisible: false,
      options: [{
        value: '装甲兵1旅',
        label: '装甲兵1旅'
      }, {
        value: '装甲兵2旅',
        label: '装甲兵2旅'
      }, {
        value: '装甲兵3旅',
        label: '装甲兵3旅'
      }, {
        value: '装甲兵4旅',
        label: '装甲兵4旅'
      }],
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
            },
            axisLabel: {
              interval: 0,//横轴信息全部显示
              rotate: -30//-30度角倾斜显示
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
            },
            axisLabel: {
              interval: 0,//横轴信息全部显示
              rotate: -30//-30度角倾斜显示
            }
          }],
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
  created() {
  },
  mounted() {
    let this_ = this;
    this.centerDialogVisible = true;
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
  },
  activated() {
    let myChart = echarts.init(document.getElementById('in'));
    myChart.setOption(this.option);
    myChart.resize();

    let myChart1 = echarts.init(document.getElementById('out'));
    myChart1.setOption(this.option1);
    myChart1.resize();
  },
  methods: {
    sure() {
      this.centerDialogVisible = false;
      bus.$emit('load_the_page');
      request({
        baseURL: 'http://' + Global.ip + ':8101',
        url: '/api/vehicle/sum/' + this.value,
        method: 'get'
      }).then(res => {
        console.log(res.data['车辆驶出情况']);
        let out = res.data['车辆驶出情况'];
        const keys1 = Object.keys(out);
        console.log(out[keys1[5]]);
        let val1 = Object.values(out);
        console.log(val1);
        this.option1.xAxis[0].data = keys1;
        // for (let i = 0; i < keys1.length; i++) {
        //   console.log(val1)
        //   val1.push(out[keys1[i]]);
        // }
        this.option1.series[0].data = val1;
        console.log(val1);
        let myChart1 = echarts.init(document.getElementById('out'));
        myChart1.setOption(this.option1);
        let vehicle_in = res.data['车辆驶入情况'];
        const keys = Object.keys(vehicle_in);
        let val = Object.values(vehicle_in);
        console.log(keys);
        this.option.xAxis[0].data = keys;
        // for (let i = 0; i < keys.length; i++) {
        //   val.push(vehicle_in[keys[i]]);
        //   console.log(val)
        // }
        this.option.series[0].data = val;
        console.log(val + '最后');
        let myChart = echarts.init(document.getElementById('in'));
        myChart.setOption(this.option);
      }).catch(err => {
        this.$message.error('获取数据失败！');
      });
    },
    cancel() {
      this.$router.back();
    }
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