<style scoped>
#equip {
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
    <div id='equip'>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts';
import request from '@/network/request';

export default {
  name: 'sectorequip',
  data() {
    return {
      option: {
        title: {
          text: '器材分析',
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
          top: '5%',
          data: ['弹药', '燃油', '钢盔']
        },
        series: [
          {
            name: '器材分析',
            type: 'pie',
            radius: '55%',
            center: ['60%', '60%'],
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
    let chart = echarts.init(document.getElementById('equip'));
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
        url: '/api/perception/equipment/' + newVal
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
        let chart = echarts.init(document.getElementById('equip'));
        chart.setOption(this.option);
      }).catch(err => {
        this.$message.error('获取数据失败！');
      });
      }
  },
  created() {
      request({
        url: '/api/perception/equipment/' + this.value
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
        let chart = echarts.init(document.getElementById('equip'));
        chart.setOption(this.option);
      }).catch(err => {
        this.$message.error('获取数据失败！');
      });
    }
};
</script>
