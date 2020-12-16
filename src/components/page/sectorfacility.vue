<style scoped>
#sector {
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
    <div id='sector'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import request from "@/network/request";

export default {
  name: 'sector',
  data() {
    return {
      option: {
        title: {
          text: '装备分析',
          top: '5%',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        color:['red', 'blue', 'orange', 'green'],
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '15%',
          data: ['装甲车', '手枪', '坦克']
        },
        series: [
          {
            name: '装备分析',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '装甲车' },
              { value: 310, name: '手枪' },
              { value: 234, name: '坦克' }
            ],
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
  watch: {
    value: function (newVal, oldVal){
        request({
        url: 'device/' + newVal
      }).then(res => {
        var datas = new Array();
        var keys = Object.keys(res.data);
        this.option.legend.data = keys;
        for(var i=0; i<keys.length; i++){
          var arr = new Object();
          arr.name = keys[i];
          arr.value = res.data[keys[i]];
          datas.push(arr);
        }
        this.option.series[0].data = datas;
        let chart = echarts.init(document.getElementById('sector'));
        chart.setOption(this.option);
      }).catch(err => {
        alert('获取数据失败！');
      });
      }
  },
  created() {
    request({
        url: 'device/' + this.value
      }).then(res => {
        var datas = new Array();
        var keys = Object.keys(res.data);
        this.option.legend.data = keys;
        for(var i=0; i<keys.length; i++){
          var arr = new Object();
          arr.name = keys[i];
          arr.value = res.data[keys[i]];
          datas.push(arr);
        }
        this.option.series[0].data = datas;
        let chart = echarts.init(document.getElementById('sector'));
        chart.setOption(this.option);
      }).catch(err => {
        alert('获取数据失败！');
      });
  }
};
</script>
