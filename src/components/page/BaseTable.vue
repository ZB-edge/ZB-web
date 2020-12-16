<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 战损评估
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    <el-dialog-->
    <!--      title='装备信息'-->
    <!--      :visible.sync='centerDialogVisible'-->
    <!--      width='30%'-->
    <!--      center>-->
    <!--      <p style='display: inline'>单位：</p>-->
    <!--      <el-select v-model='value' filterable placeholder='请选择'>-->
    <!--        <el-option-->
    <!--          v-for='item in options'-->
    <!--          :key='item.value'-->
    <!--          :label='item.label'-->
    <!--          :value='item.value'>-->
    <!--        </el-option>-->
    <!--      </el-select>-->
    <!--      <span slot='footer' class='dialog-footer'>-->
    <!--        <el-button type='primary' @click='centerDialogVisible = false'>确 定</el-button>-->
    <!--    <el-button @click='centerDialogVisible = false'>取 消</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除
        </el-button>
        <el-input v-model="query.name" placeholder="图片名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="adddialog" style="float: right">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="图片名称" align="center"></el-table-column>
        <el-table-column label="装备图片" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="描述" align="center"></el-table-column>
        <el-table-column prop="date" label="上传时间" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-upload"
              @click="handleEdit(scope.$index, scope.row)"
            >上传
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <div>
      <el-dialog
        title="新增战损评估"
        :visible.sync="uploadDialog"
        @close="clear"
        center>
        <el-form v-model="form" style="text-align: center">
          <el-form-item label="图片名称" prop="name"  label-width="80px" >
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入图片名称"></el-input>
          </el-form-item>
          <el-form-item label="装备图片" prop="logo" label-width="80px">
            <el-input v-model="form.logoUrl" autocomplete="off" placeholder="图片URL"></el-input>
            <el-upload
              class='upload-demo'
              action='http://jsonplaceholder.typicode.com/api/posts/'
              multiple
              style="margin-top: 20px">
              <i class='el-icon-upload'></i>
              <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
              <div class='el-upload__tip' slot='tip'>只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片描述" prop="nameAdmin" label-width="80px">
            <el-input v-model="form.nameAdmin" autocomplete="off" placeholder="请输入图片描述"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="">确定</el-button>
          <el-button @click="uploadDialog = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        address: '',
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
        logoUrl: '',
        nameAdmin: ''
      }
    };
  },
  clear () {
    this.$refs.imgUpload.clear()
    this.form = {
      name: '',
      logoUrl: '',
      nameAdmin: ''
    }
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
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
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          this.tableData.splice(index, 1);
        })
        .catch(() => {
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
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
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
    }
  }
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
