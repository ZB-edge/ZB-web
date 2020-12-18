<template>
  <div>
    <el-row :gutter='20' class='mgb20'>
      <el-col :span='6'>
        <el-card shadow='hover' :body-style="{padding: '0px'}">
          <div class='grid-content grid-con-1'>
            <i class='el-icon-lx-home grid-con-icon'></i>
            <div class='grid-cont-right'>
              <div class='grid-num'>隶属单位</div>
              <div>中国人民解放军陆军装甲兵学院</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span='6' v-for='(info,index) in total_info'>
        <el-card shadow='hover' :body-style="{padding: '0px'}">
          <div class='grid-content' :class='"grid-con-"+(index+1)'>
            <i class='grid-con-icon' :class='info.icon'></i>
            <div class='grid-cont-right'>
              <div class='grid-num'>{{ info.value }}</div>
              <div>{{info.title}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter='20'>
      <el-col :span='12'>
        <el-card shadow='hover'>
          <!--                    <p style="display: inline">单位：</p >-->
          <!--                    <charset></charset>-->
          <div class='schart'>
            <sector></sector>
          </div>
        </el-card>
      </el-col>
      <el-col :span='12'>
        <el-card shadow='hover'>
          <!--                    <p style="display: inline">单位：</p >-->
          <!--                    <charset></charset>-->
          <div class='schart'>
            <sectorequip></sectorequip>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import histogram from '@/components/page/histogram';
import sector from '@/components/page/sectorfacility';
import sectorequip from '@/components/page/sectorequip';
import request from '@/network/request';

export default {
  name: 'dashboard',
  data() {
    return {
      name: localStorage.getItem('ms_username'),
      total_info:[
        { title:'总人数', value:'', icon:'el-icon-lx-people' },
        { title:'装备类型', value:'', icon:'el-icon-lx-goods' },
        { title:'器材类型', value:'', icon:'el-icon-menu' },
      ]
    };
  },
  components: {
    Schart, histogram, sector, sectorequip
  },
  computed: {
    role() {
      return this.name === 'admin' ? '超级管理员' : '普通用户';
    }
  },
  created() {
    request({
      method:'get',
      url: '/api/perception/'+ localStorage.getItem('ms_username')+'/edgeNum',
    }).then(res=>{
      for (let i = 0; i < res.data.length; i++) {
        this.total_info[i].value = res.data[i]
      }
    })
  },
  // activated() {
  //     this.handleListener();
  // },
  // deactivated() {
  //     window.removeEventListener('resize', this.renderChart);
  //     bus.$off('collapse', this.handleBus);
  // },
  methods: {
    // changeDate() {
    //   const now = new Date().getTime();
    //   this.data.forEach((item, index) => {
    //     const date = new Date(now - (6 - index) * 86400000);
    //     item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    //   });
    // }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
  background: rgb(33, 100, 20);
}

.grid-con-4 .grid-num {
  color: rgb(33, 100, 20);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
