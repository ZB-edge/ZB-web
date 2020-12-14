<style scoped>
  #chart_example{
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
</style>
<template>
  <div>
    <p style="display: inline">单位：</p >
    <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <div id="chart_example">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import request from "@/network/request";
  export default {
    name:'histogram',
    data() {
      return {
        option:{
          title:{
            text:'人员占比分布总览',
            left: "center",
            top:'5%'
          },
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          formatter:'{b} {c}%',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLabel: {
                  show: true,
                  interval: 'auto',
                  formatter: '{value} %'
                },
            show: true,
            min:0,
            max:100
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
                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        // formatter: '{b}\n{c}%'　　　　//这是关键，在需要的地方加上就行了
                      formatter: '{c}%'
                    }
                }
            },
            data: [12,21,10,4,12,5,6,5,25,23,7],
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
        value: ''
      }
    },
    mounted() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById('chart_example'));
      myChart.setOption(this.option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },
    methods: {},
    watch: {},
    created() {

           request({
  url:'/home/multidata'
    }).then(res =>{
      // console.log(res.data.data.banner.list[0].title)
    }).catch(err => {
  alert('获取数据失败！')
    })
           this.option.xAxis[0].data = ["党员", "群众", "其他"];
           this.option.series[0].data = [58, 26, 36];
           console.log(this.option.series)
    }
  }
</script>
