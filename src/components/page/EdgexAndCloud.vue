<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item><i class='el-icon-lx-calendar'></i> 云边协同</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='container'>
      <div class='handle-box'>
        <el-input placeholder='请选择设备' class='handle-input mr10'></el-input>
        <el-button type='primary' icon='el-icon-search' @click=''>搜索</el-button>
        <el-button type='primary' icon='el-icon-search' @click='' style='float: right'>新增</el-button>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'edgexandcloud',
  data: function() {
    return {
      query: {
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
    };
  },
  components: {

  },
  methods: {

  }
};
</script>
<style scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>