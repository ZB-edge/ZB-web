<style scoped>
  #equip{
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
</style>
<template>
    <div id="equip">
    </div>
</template>

<script>
  import echarts from 'echarts'
  import request from "@/network/request";
  export default {
    name:'sectorequip',
    data() {
      return {
        option:{
    title: {
        text: '某站点用户访问来源',
        top:'5%',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        top:'15%',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            itemStyle:{
                    normal:{
                               label:{
                                  show: true,
                                  formatter: '{b} : {c}'
                                  },
                                  labelLine :{show:true}
                                  }
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                }
            }
        }
    ]
}

      }
    },
    mounted() {
      let this_ = this;
      let chart = echarts.init(document.getElementById('equip'));
      chart.setOption(this.option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {chart.resize()});
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
      this.option.series[0].data = [{value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'}]
      console.log(this.option.series[0].data)
    }
  }
</script>
