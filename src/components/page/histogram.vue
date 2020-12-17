<style scoped>
#chart_example {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
<template>
  <div>
    <p style='display: inline'>单位：</p>
    <el-select v-model='value' filterable placeholder='请选择'>
      <el-option
        v-for='item in options'
        :key='item.value'
        :label='item.label'
        :value='item.value'>
      </el-option>
    </el-select>
    <div id='chart_example'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import request from '@/network/request';

export default {
  name: 'histogram',
  data() {
    return {
      option: {
        title: {
          text: '人员占比分布总览',
          left: 'center',
          top: '5%'
        },
        color: ['#f44'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {c}%',
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
              interval: 'auto',
              formatter: '{value} %'
            },
            show: true,
            min: 0,
            max: 100
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
                  position: 'top',
                  // formatter: '{b}\n{c}%'　　　　//这是关键，在需要的地方加上就行了
                  formatter: '{c}%'
                }
              }
            },
            data: []
          }
        ]
      },
      options: [{
        value: '装甲兵1旅',
        label: '一旅'
      }, {
        value: '装甲兵2旅',
        label: '二旅'
      }, {
        value: '装甲兵3旅',
        label: '三旅'
      }, {
        value: '装甲兵4旅',
        label: '四旅'
      },],
      value:'装甲兵1旅',
      }
    },
    mounted() {
      let myChart = echarts.init(document.getElementById('chart_example'));
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },
    methods: {},
    watch: {
      value: function (newVal, oldVal){
        request({
  url: '/api/perception/person/'+newVal
    }).then(res =>{
      const keys = Object.keys(res.data);
      let val = [];
      this.option.xAxis[0].data = keys;
      for(let i = 0;i<keys.length; i++){
        val.push(res.data[keys[i]])
      }
      this.option.series[0].data = val;
      let myChart = echarts.init(document.getElementById('chart_example'));
      myChart.setOption(this.option);
    }).catch(err => {
      this.$message.error('获取数据失败！');
    })
      }
    },
  created() {
    request({
      url: '/api/perception/person/' + this.value
    }).then(res => {
      const keys = Object.keys(res.data);
      let val = [];
      this.option.xAxis[0].data = keys;
      for (let i = 0; i < keys.length; i++) {
        val.push(res.data[keys[i]]);
      }
      this.option.series[0].data = val;
      let myChart = echarts.init(document.getElementById('chart_example'));
      myChart.setOption(this.option);
    }).catch(err => {
      this.$message.error('获取数据失败！');
    })
    }
};
</script>
