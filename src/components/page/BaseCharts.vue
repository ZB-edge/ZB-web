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
            <el-button type="primary" style="float: right">一键上传</el-button>
          </div>
          <el-table :data='org_info' height='250' border :row-style="{height: '35px'}"
                    style='width: 100%'>
            <el-table-column prop='id' label='序号' width='60'></el-table-column>
            <el-table-column prop='name' label='单位名称' width='120'></el-table-column>
            <el-table-column prop='type' label='单位类别' width='120'></el-table-column>
            <el-table-column prop='description' label='基本信息描述' show-overflow-tooltip></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span='11' style="float: right;width: 49%">
        <el-card shadow='hover'>
          <div slot='header' class='clearfix'>
            <span>车辆驶出</span>
            <el-button type="primary" style="float: right">一键上传</el-button>
          </div>
          <el-table :data='org_info' height='250' border :row-style="{height: '35px'}"
                    style='width: 100%'>
            <el-table-column prop='id' label='序号' width='60'></el-table-column>
            <el-table-column prop='name' label='单位名称' width='120'></el-table-column>
            <el-table-column prop='type' label='单位类别' width='120'></el-table-column>
            <el-table-column prop='description' label='基本信息描述' show-overflow-tooltip></el-table-column>
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
    this.centerDialogVisible = true;
  },
  mounted() {
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