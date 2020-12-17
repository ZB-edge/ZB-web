<template>
  <div>
    <el-dialog title='单位信息' width='30%' :visible.sync='dialogFormVisible' :show-close='false'
               :close-on-click-modal='false' center>
      <el-form :model='form'>
        <el-form-item label='单位名称:' :label-width='formLabelWidth'>
          <el-select v-model='form.institution' placeholder='请选择单位名称'>
            <el-option v-for='institution in form.institutions' :label='institution'
                       :value='institution' :key='institution'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='sure'>确 定</el-button>
        <el-button @click='cancel'>取 消</el-button>
      </div>
    </el-dialog>
    <div v-show='!dialogFormVisible' class='container'>
      <el-row :gutter='20'>
        <el-col :span='12'>
          <el-card shadow='hover' class='box-card'>
            <div slot='header' class='clearfix' style='text-align: center'>
              <div style='font-weight: bold'>{{ form.institution }}人员信息</div>
            </div>
            <div style='display: flex;'>
              <div v-for='item in items' :key='item.name' style='flex:1;'>
                {{ item.name }}: <span style='font-weight: bold'>{{ item.value }}</span>
              </div>
            </div>
          </el-card>
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class='map'>
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
            <bm-marker v-for='location in locations'
                       :position="{lng: location.lng, lat: location.lat}"
                       animation="BMAP_ANIMATION_BOUNCE" :top='true' :key='location.name'>
              <bm-label :content="location.name" :labelStyle="labelStyle" :offset="{width: -12, height: 30}"/>
            </bm-marker>
          </baidu-map>
<!--          <div id='protection_ability' class='protection_ability'></div>-->
        </el-col>
        <el-col :span='12'>
          <div id='material' class='material'></div>
          <el-table :data='tableData' style='width: 100%' height='200'>
            <el-table-column :label='tableHead[0]' prop='ammunition'></el-table-column>
            <el-table-column :label='tableHead[1]' prop='count'></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts';
import bus from '@/components/common/bus';
import baiduMap from 'vue-baidu-map'
import request from '../../network/request';
Vue.use(baiduMap,{
  ak:'nLp8aFpm9A2qGNuqqtq4xG7S3nnHnLCa'
})
export default {
  name: 'LogisticsManage',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      center:{lng: 0, lat: 0},
      zoom: 3,
      items: [
        { name: '党员比例', value: '70%' },
        { name: '专员比例', value: '55%' },
        { name: '校官比例', value: '30%' },
        { name: '本科比例', value: '60%' }],
      form: {
        institutions: ['一旅', '二旅', '三旅', '四旅', '五旅'],
        institution: ''
      },
      tableHead: ['器材', '数量'],
      tableData: [
        {
          ammunition: '5.56mm步弹枪',
          count: 10
        }, {
          ammunition: '5.8mm手枪弹',
          count: 5
        }, {
          ammunition: '12.7mm机弹枪',
          count: 1
        }, {
          ammunition: '105mm穿甲弹',
          count: 100
        }, {
          ammunition: '105mm破甲弹',
          count: 27
        }, {
          ammunition: '35mm高射机枪弹',
          count: 38
        }
      ],
      material: ['发动机', '水泵', '水散热器', '高压柴油泵', 'HJ-9反坦克导弹', '喷油器', '履带片'],
      locations:[{
        name:'修理连',
        lng: 116.404,
        lat: 39.915
      }],
      labelStyle:{color: '#0000ff', fontSize : '16px', border:'none',background: 'transparent',fontWeight: '700' },
      material_data: [10, 2, 7, 30, 6, 9, 20],
      protection_ability_option: {
        title: {
          text: '保障力量',
          // subtext: '单位：人',
          left: 'center',
          top: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}人 ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['装备抢修排', '修理连', '供应保障队', '运输连', '装备保障大队']
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 1548, name: '装备保障大队' },
              { value: 535, name: '装备抢修排' },
              { value: 510, name: '修理连' },
              { value: 634, name: '供应保障队' },
              { value: 735, name: '运输连' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  // position: 'inner',
                  show: true,
                  formatter: '{b} \n\n {c} ({d}%)'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      },
      material_option: {
        title: {
          text: '弹药库',
          left: 'center',
          top: 10
        },
        xAxis: {
          type: 'category',
          data: ['发动机', '水泵', '水散热器', '高压柴油泵', 'HJ-9反坦克导弹', '喷油器', '履带片'],
          axisLabel: {
            interval: 0,//横轴信息全部显示
            rotate: -30//-30度角倾斜显示
          }
        },
        yAxis: {
          name: '数量/个',
          type: 'value'
        },
        series: [{
          data: [10, 2, 7, 30, 6, 9, 20],
          type: 'bar',
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
                  color: '#ff2200',
                  fontSize: 12
                }
              }
            }
          }
        }]
      }
    };
  },
  methods: {
    sure(){
      this.dialogFormVisible = false;
      bus.$emit('load_the_page')
    },
    cancel(){
      this.$router.back()
    },
    handler ({BMap, map}) {
      // console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 12
    }
  },
  created() {
    request({

    })
  },
  mounted() {
    this.dialogFormVisible = true;
    // const ProtectionAbilityChart = echarts.init(document.getElementById('protection_ability'));
    // ProtectionAbilityChart.setOption(this.protection_ability_option);
    const MaterialChart = echarts.init(document.getElementById('material'));
    MaterialChart.setOption(this.material_option);
  }
};
</script>

<style scoped>
.protection_ability {
  margin-top: 55px;
  width: 500px;
  height: 400px;
}

.material {
  width: 600px;
  height: 400px;
}
.map{
  margin-top: 55px;
  width: 100%;
  height: 420px;
}
</style>