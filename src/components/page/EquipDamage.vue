<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class='el-icon-lx-cascades'></i> 战损评估
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='container'>
      <div class='handle-box'>
        <el-button
          type='primary'
          icon='el-icon-delete'
          class='handle-del mr10'
          @click='delAllSelection'
        >批量删除
        </el-button>
        <el-input v-model='query.name' placeholder='图片名称' class='handle-input mr10'></el-input>
        <el-button type='primary' icon='el-icon-search' @click='handleSearch'>搜索</el-button>
        <el-button type='primary' icon='el-icon-search' @click='adddialog' style='float: right'>新增</el-button>
      </div>
      <el-table :data='tableData' border class='table' ref='multipleTable'
                header-cell-class-name='table-header'
                @selection-change='handleSelectionChange'
      >
        <el-table-column type='selection' width='55' align='center'></el-table-column>
        <el-table-column type='index' label='ID' width='55' align='center'></el-table-column>
        <el-table-column prop='name' label='图片名称' align='center'></el-table-column>
        <el-table-column label='装备图片' align='center'>
          <template slot-scope='scope'>
            <el-image
              class='table-td-thumb'
              :src="'http://202.112.157.52:8100/image/'+scope.row.name+'.jpg'"
              :preview-src-list="['http://202.112.157.52:8100/image/'+scope.row.name+'.jpg']"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label='状态' align='center' width='65'>
          <template slot-scope='scope'>
            <el-tag v-if="scope.row.status==='1'" type='success'>
              成功
            </el-tag>
            <el-tag v-else type='danger'>
              失败
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop='info' label='描述' align='center'></el-table-column>
        <el-table-column prop='date' label='上传时间' align='center'></el-table-column>
        <el-table-column label='操作' width='180' align='center'>
          <template slot-scope='scope'>
            <el-button
              type='primary'
              icon='el-icon-upload'
              :id="'btn_upload'+scope.$index"
              :key='scope.$index'
              @click='handleUpload(scope.$index, scope.row)'
            >同步
            </el-button>
            <el-button
              type='danger'
              icon='el-icon-delete'
              @click='handleDelete(scope.$index, scope.row)'
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class='pagination'>
        <el-pagination
          background
          layout='total, prev, pager, next'
          :current-page='query.pageIndex'
          :page-size='query.pageSize'
          :total= 'tableData.length'
          @current-change='handlePageChange'
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <div>
      <el-dialog
        title='新增战损评估'
        :visible.sync='uploadDialog'
        center>
        <el-form v-model='form' style='text-align: center'>
          <el-upload class='upload-demo' action='http://202.112.157.52:8100/api/damage/upload' accept='.jpg'
                     ref="upload" :on-success='file_upload_success' :on-change='file_upload' :auto-upload='false' style='margin-top: 20px'>
            <i class='el-icon-upload'></i>
            <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
            <div class='el-upload__tip' slot='tip'>只能上传jpg文件，且不超过500kb</div>
          </el-upload>
          <el-form-item label='图片描述' prop='nameAdmin' label-width='80px'>
            <el-input v-model='form.info' autocomplete='off' placeholder='请输入图片描述'></el-input>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button type='primary' @click='sure'>上传</el-button>
          <el-button @click='uploadDialog = false'>取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import request from '../../network/request';
import echarts from "echarts";

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      uploadDialog: false,
      pageTotal: 0,
      idx: -1,
      id: -1,
      form: {
        name: '',
        info: ''
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      request({
        baseURL: 'http://202.112.157.52:8100',
        url: '/api/damage/show',
        method: 'get'
      }).then(res => {
        this.tableData = res.data;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning',
        showCancelButton: true,
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.tableData.splice(index, 1);
        console.log(row.name);
        console.log(typeof row.name);
        request({
          baseURL: 'http://202.112.157.52:8100',
          url: '/api/damage/delete?name='+row.name,
          method: 'delete',
        }).then(res=>{
          this.$message.success('删除成功');
        })
      }).catch(() => {

      });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 上传操作
    handleUpload(index, row) {
      request({
        baseURL: 'http://202.112.157.52:8100',
        url: '/api/damage/export/'+localStorage.getItem('ms_username')+'?name='+row.name,
        method: 'post',
        timeout: 100000
      }).then(res=>{
        this.$message.success('同步成功');
        row.status = "1"
      }).catch(err=>{
        this.$message.error('同步失败');
      })
    },
    adddialog() {
      this.uploadDialog = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },
    // 上传图片以后执行函数
    file_upload(file) {
      this.form.name = file.name;
    },
    // 上传图片确认按钮
    sure() {
      request({
        baseURL: 'http://202.112.157.52:8100',
        url: '/api/damage/save',
        method: 'post',
        timeout: 10000,
        data: {
          name: this.form.name,
          info: this.form.info,
          status: 0
        }
      }).then(res => {
        console.log(res.data);
        console.log(res.data === "上传成功");
        if(res.data === "上传成功！"){
          this.$refs.upload.submit();
        }
        else{
        }
      });
    },
    file_upload_success(response, file, fileList){
      console.log("成功");
      this.uploadDialog = false;
      this.$message.success('上传成功')
      this.getData()
    }
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
