<template>
  <div>
    <el-dialog title='装备信息' width='40%' :visible.sync='dialogFormVisible' :show-close='false' :close-on-click-modal='false' center>
      <el-form :model='form'>
        <el-form-item label='单位名称' :label-width='formLabelWidth'>
          <el-select v-model='form.institution' placeholder='请选择单位名称'>
            <el-option v-for='institution in form.institutions' :label='institution'
                       :value='institution' :key='institution'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='装备类型' :label-width='formLabelWidth'>
          <el-select v-model='form.equipment' placeholder='请选择装备类型'>
            <el-option v-for='equipment in form.equipments' :label='equipment'
                       :value='equipment' :key='equipment'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='设备名称' :label-width='formLabelWidth'>
          <el-select v-model='form.name' placeholder='请选择设备名称'>
            <el-option v-for='name in form.names' :label='name' :value='name' :key='name'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='dialogFormVisible = false'>确 定</el-button>
        <el-button @click='dialogFormVisible = false;$router.back()'>取 消</el-button>
      </div>
    </el-dialog>
    <div v-show='!dialogFormVisible' class='container' style='position: relative'>
      <el-row :gutter='20' style='height: 300px'>
        <el-col :span='8' id='speed' style='height: inherit; '></el-col>
        <el-col :span='8' id='speed_length' style='height: inherit; '></el-col>
        <el-col :span='8' id='rotate_speed' style='height: inherit; '></el-col>
      </el-row>
      <el-row :gutter='20' style='height: 300px;'>
        <el-col :span='4' id='oil_volume_middle' style='height: inherit;'></el-col>
        <el-col :span='8' id='engine_water_temperature' style='height: inherit;'></el-col>
        <el-col :span='8' id='engine_oil_temperature' style='height: inherit;'></el-col>
        <el-col :span='4' id='oil_volume_front' style='height: inherit;'></el-col>
      </el-row>
      <h2 class='info_content'>{{form.institution}}/{{form.equipment}}/设备名</h2>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'EquipmentManage',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        institutions: ['一旅', '二旅', '三旅', '四旅', '五旅'],
        institution: '',
        equipments: ['08式步战车', '080式突击车', '08式输送车', '08式指挥车'],
        equipment: '',
        names: [],
        name: ''
      },
      speed_option: {
        title: {
          text:'车速',
          left: 'center'
        },
        // toolbox: { //可视化的工具箱
        //   show: true,
        //   feature: {
        //     restore: { //重置
        //       show: true
        //     },
        //     saveAsImage: {//保存图片
        //       show: true
        //     }
        //   }
        // },
        // tooltip: { //弹窗组件
        //   formatter: '{a} <br/>{b} : {c}km/h'
        // },
        series: [{
          type: 'gauge',
          min: 0,
          max: 120,
          splitNumber: 6,
          detail: { formatter: '{value}', fontSize:13 },
          data: [{ value: 45, name: 'km/h' }]
        }]
      },
      rotate_speed_option:{
        title: {
          text:'转速',
          left: 'center'
        },
        series: [{
          type: 'gauge',
          min: 0,
          max: 3000,
          splitNumber: 6,
          detail: { formatter: '{value}', fontSize:13 },
          data: [{ value: 600, name: 'rpm' }]
        }]
      },
      speed_length_option:{
        title: {
          text:'里程统计',
          left: 'center'
        },
        color:['red', 'green'],
        legend: {
          orient: 'horizontal',
          top:20,
          right: 10,
          data: ['当前量','剩余量']
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 10, name: '当前量'},
              {value: 90, name: '剩余量'},
            ]
          }
        ]
      },
      oil_volume_middle_option:{
        title: {
          text:'中置油箱油量',
        },
        grid:{
          left: 30
        },
        xAxis: {
          type: 'category',
          data: ['中置油箱油量']
        },
        yAxis: {
          name:'油量/L',
          type: 'value',
          max:150,
        },
        series: [{
          data: [120],
          type: 'bar',
          color: '#338FCC',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#338FCC',
                  fontSize: 12
                }
              }
            }
          },
        }]
      },
      oil_volume_front_option:{
        title: {
          text:'车首油箱油量',
          left: 'right'
        },
        grid:{
          left: 30
        },
        xAxis: {
          type: 'category',
          data: ['车首油箱油量']
        },
        yAxis: {
          name:'油量/L',
          type: 'value',
          max:300,
        },
        series: [{
          data: [136.21],
          type: 'bar',
          color: '#338FCC',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#338FCC',
                  fontSize: 12
                }
              }
            }
          },
        }]
      },
      engine_water_temperature_option:{
        title: {
          text:'发动机水温',
        },
        series: [{
          name: '℃',
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 10,
          detail: { formatter: '{value}', fontSize:16 },
          data: [{ value: 45, name: '℃' }]
        }]
      },
      engine_oil_temperature_option:{
        title: {
          text:'变速箱油温',
          left: 'right'
        },
        series: [{
          name: '℃',
          type: 'gauge',
          min: 0,
          max: 150,
          splitNumber: 10,
          detail: { formatter: '{value}', fontSize:16 },
          data: [{ value: 100, name: '℃' }]
        }]
      }
    };
  },
  mounted() {
    this.dialogFormVisible = true;
    const SpeedChart = echarts.init(document.getElementById('speed'));
    // 使用刚指定的配置项和数据显示图表。
    SpeedChart.setOption(this.speed_option);
    const RotateSpeedChart = echarts.init(document.getElementById('rotate_speed'));
    RotateSpeedChart.setOption(this.rotate_speed_option)
    const SpeedLength = echarts.init(document.getElementById('speed_length'));
    SpeedLength.setOption(this.speed_length_option)
    const OilVolumeMiddle = echarts.init(document.getElementById('oil_volume_middle'));
    OilVolumeMiddle.setOption(this.oil_volume_middle_option)
    const OilVolumeFront = echarts.init(document.getElementById('oil_volume_front'));
    OilVolumeFront.setOption(this.oil_volume_front_option)
    const EngineWaterTemperature = echarts.init(document.getElementById('engine_water_temperature'));
    EngineWaterTemperature.setOption(this.engine_water_temperature_option)
    const EngineOilTemperature = echarts.init(document.getElementById('engine_oil_temperature'));
    EngineOilTemperature.setOption(this.engine_oil_temperature_option)
  }
};
</script>

<style scoped>
.info_content{
  position: absolute;
  font-style: italic;
  top: 50%;
  right: 50%;
  transform:translate(50%,0);
  background-color: #ccc;
}
</style>