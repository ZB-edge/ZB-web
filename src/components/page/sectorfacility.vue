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

export default {
  name: 'sector',
  data() {
    return {
      option: {
        title: {
          text: '某站点用户访问来源',
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
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
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
      value: '龙须面',
      data: [{
        label: '北京烤鸭',
        data: [{ value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      },
        {
          label: '双皮奶',
          data: [{ value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' }
          ]
        },
        {
          label: '龙须面',
          data: [{ value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' }
          ]
        }
      ]
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
    value: function(newVal, oldVal) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].label == newVal) {
          this.option.series[0].data = this.data[i].data;
          break;
        } else {
          this.option.series[0].data = '';
        }
      }
      let this_ = this;
      let chart = echarts.init(document.getElementById('sector'));
      chart.setOption(this.option);
    }
  },
  created() {
    for (var i = 0; i < this.data.length; i++) {
      console.log(this.data[0].label);
      if (this.data[i].label == this.value) {
        this.option.series[0].data = this.data[i].data;
      } else {
        this.option.series[0].data = '';
      }
    }
  }
};
</script>
