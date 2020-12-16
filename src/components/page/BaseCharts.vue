<template>
  <div>
    <el-dialog
      title='单位信息'
      :visible.sync='centerDialogVisible'
      width='40%'
      :show-close='false'
      :close-on-click-modal='false'
      center>
       <p style='display: inline'>单位名称：</p>
      <el-select v-model='value' filterable placeholder='请选择单位名称'>
        <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
      <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='centerDialogVisible = false'>确 定</el-button>
    <el-button @click='centerDialogVisible = false;$router.back()'>取 消</el-button>
  </span>
    </el-dialog>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 装备使用分析
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <!--        <div class="crumbs">-->
    <!--            <el-breadcrumb separator="/">-->
    <!--                <el-breadcrumb-item>-->
    <!--                    <i class="el-icon-pie-chart"></i> schart图表-->
    <!--                </el-breadcrumb-item>-->
    <!--            </el-breadcrumb>-->
    <!--        </div>-->
    <!--        <div class="container">-->
    <!--            <div class="plugins-tips">-->
    <!--                vue-schart：vue.js封装sChart.js的图表组件。-->
    <!--                访问地址：-->
    <!--                <a-->
    <!--                    href="https://github.com/lin-xin/vue-schart"-->
    <!--                    target="_blank"-->
    <!--                >vue-schart</a>-->
    <!--            </div>-->
    <!--            <div class="schart-box">-->
    <!--                <div class="content-title">柱状图</div>-->
    <!--                <schart class="schart" canvasId="bar" :options="options1"></schart>-->
    <!--            </div>-->
    <!--            <div class="schart-box">-->
    <!--                <div class="content-title">折线图</div>-->
    <!--                <schart class="schart" canvasId="line" :options="options2"></schart>-->
    <!--            </div>-->
    <!--            <div class="schart-box">-->
    <!--                <div class="content-title">饼状图</div>-->
    <!--                <schart class="schart" canvasId="pie" :options="options3"></schart>-->
    <!--            </div>-->
    <!--            <div class="schart-box">-->
    <!--                <div class="content-title">环形图</div>-->
    <!--                <schart class="schart" canvasId="ring" :options="options4"></schart>-->
    <!--            </div>-->
    <!--                <sector></sector>-->
    <!--        </div>-->
    <div  v-show='!centerDialogVisible' class='container'>
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

4;
import sectorequip from '@/components/page/sectorequip';
import echarts from 'echarts';

export default {
  name: 'basecharts',
  components: {
    sector, sectorequip
  },
  data() {
    return {
      centerDialogVisible: false,
      options: [{
        value: '一旅',
        label: '一旅'
      }, {
        value: '二旅',
        label: '二旅'
      }, {
        value: '三旅',
        label: '三旅'
      }, {
        value: '四旅',
        label: '四旅'
      }],
      value: '',
      option: {
        title: {
          text: '装备使用情况（入）',
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
            data: ['1月1日', '1月2日', '1月2日', '1月2日', '1月2日', '1月2日', '1月2日'],
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
            data: [12, 21, 10, 4, 12, 5, 6, 5, 25, 23, 7]
          }
        ]
      },
      option1: {
        title: {
          text: '装备使用情况（出）',
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
            data: ['1月1日', '1月2日', '1月2日', '1月2日', '1月2日', '1月2日', '1月2日'],
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
            data: [12, 21, 10, 4, 12, 5, 6, 5, 25, 23, 7]
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