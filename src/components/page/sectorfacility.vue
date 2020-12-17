<style scoped>
#sector {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
<template>
  <div>
    <div id='sector'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import request from '@/network/request';

export default {
  name: 'sector',
  data() {
    return {
      option: {
        title: {
          text: '战车分析',
          subtext: '单位：辆',
          top: '5%',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '15%',
          data: []
        },
        series: [
          {
            name: '战车分析',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c}'
                },
                labelLine: { show: true }
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
    };
  },
  mounted() {
    let this_ = this;
    let chart = echarts.init(document.getElementById('sector'));
    chart.setOption(this.option);
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener('resize', function() {
      chart.resize();
    });
  },
  methods: {},
  watch: {},
  created() {
    let username = localStorage.getItem('ms_username');
    request({
      baseURL: 'http://localhost:8095',
      url: '/api/perception/device/' + username,
      method: 'get',
    }).then(res => {
      let datas = [];
      let keys = Object.keys(res.data);
      this.option.legend.data = keys;
      for(let i=0; i<keys.length; i++){
        let arr = {};
        arr.name = keys[i];
        arr.value = res.data[keys[i]];
        datas.push(arr);
      }
      this.option.series[0].data = datas;
      let chart = echarts.init(document.getElementById('sector'));
      chart.setOption(this.option);
    }).catch(err => {
      this.$message.error('获取失败');
    });
  }
};
</script>
