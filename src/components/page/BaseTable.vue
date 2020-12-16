<template>
  <div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 战损分析
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
    <div class='container'>
<!--      <h3 style='margin-bottom: 20px'>单位：{{ value }}</h3>-->
      <el-table
        :data='tableData'
        border
        class='table'
        ref='multipleTable'
        header-cell-class-name='table-header'
        @selection-change='handleSelectionChange'
      >
        <el-table-column prop='id' label='序号' width='55' align='center'></el-table-column>
        <el-table-column label='图片' align='center'>
          <template slot-scope='scope'>
<!--            <div v-for='item in imgBase64' style='clear: both; display: inline-block'>-->
              <el-image
                class="table-td-thumb"
                :src="scope.row.name"
                :preview-src-list="[scope.row.name]"
              ></el-image>

<!--            </div>-->
            <!--            <div class='addbox'>-->
            <!--              <input type='file' @change='getImgBase()'>-->
            <!--              <div class='addbtn'>+</div>-->
            <!--            </div>-->
          </template>
        </el-table-column>
        <el-table-column prop='info' label='描述'></el-table-column>
        <el-table-column prop='institution' label='单位' width='180' align='center'>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import commit from '@/components/page/commit';
import request_image from "@/network/request_image";

export default {
  name: 'basetable',
  components: {
    commit
  },
  data() {
    return {
      centerDialogVisible: false,
      imgBase64: [],    //存储img base64的值将值传给后端处理
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
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
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
      value: ''
    };
  },
  created() {
    this.centerDialogVisible = true;
    request_image({
      url:''
    }).then(res => {
      let datas = [];
      for (let i = 0; i < res.data.length; i++){
        let arr = {};
        arr = res.data[i]
        arr['id'] = i+1
        arr['name'] = 'http://localhost:8100/image/' + res.data[i].name +'.jpg'
        datas.push(arr);
      }
      this.tableData = datas;
    }).catch(err => {
      alert('获取数据失败！');
    })
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
    //获取图片base64实现预览
    getImgBase() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imgBase64.push(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log(this.imgBase64);
    },
    //删除图片
    delImg(index) {
      this.imgBase64.splice(index, 1);
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
  width: 300px;
  height: 200px;
  clear: both;
}

.clearboth::after {
  content: "";
  display: block;
  clear: both;
}

.image-view {
  width: 400px;
  height: 300px;
  margin: 50px auto;
}

.addbox {
  float: left;
  position: relative;
  height: 50px;
  width: 50px;
  margin-bottom: 10px;
  text-align: center;
}

.addbox input {
  position: absolute;
  left: 0;
  height: 50px;
  width: 50px;
  opacity: 0;
}

.addbox .addbtn {
  float: left;
  height: 50px;
  width: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  background: #ccc;
  border-radius: 5px;
}

.image-view .item {
  position: relative;
  float: left;
  height: 100px;
  width: 100px;
  margin: 10px 10px 0 0;
}

.image-view .item .cancel-btn {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 20px;
  height: 20px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  background: red;
  border-radius: 10px;
  cursor: pointer;
}

.image-view .item img {
  width: 100%;
  height: 100%;
}

.image-view .view {
  clear: both;
}
</style>
