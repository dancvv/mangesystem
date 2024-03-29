<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型" prop="sensorType">
        <el-input v-model="queryParams.sensorType" placeholder="请输入传感器类型" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="参数" prop="sensorParam">
        <el-input v-model="queryParams.sensorParam" placeholder="请输入传感器参数" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['drone_system:sensor:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['drone_system:sensor:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['drone_system:sensor:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['drone_system:sensor:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sensorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="传感器编号" align="center" prop="sensorId" />
      <el-table-column label="传感器类型" align="center" prop="sensorType" />
      <el-table-column label="传感器参数" align="center" prop="sensorParam" />
      <el-table-column label="适配无人机" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="mini" v-for="(item, index) in tagItems(scope.row.matchUAV)" :key="index">{{ item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled === '1'" type="success">启用</el-tag>
          <el-tag v-if="scope.row.isEnabled !== '1'" type="warning">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['drone_system:sensor:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['drone_system:sensor:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改传感器管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="传感器类型" prop="sensorType">
          <el-input v-model="form.sensorType" placeholder="请输入传感器类型" />
        </el-form-item>
        <el-form-item label="传感器参数" prop="sensorParam">
          <el-input v-model="form.sensorParam" placeholder="请输入传感器参数" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSensor, getSensor, delSensor, addSensor, updateSensor } from "@/api/drone_system/sensor";

export default {
  name: "Sensor",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 传感器管理表格数据
      sensorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sensorType: null,
        sensorParam: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sensorType: [
          { required: true, message: "请输入传感器类型", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ],
        sensorParam: [
          { required: true, message: "请输入传感器参数", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 使用分号拆分字符数组
    tagItems(str) {
      return str.split(';').filter(item => item);
    },
    /** 查询传感器管理列表 */
    getList() {
      this.loading = true;
      listSensor(this.queryParams).then(response => {
        this.sensorList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        sensorId: null,
        sensorType: null,
        sensorParam: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.sensorId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加传感器管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sensorId = row.sensorId || this.ids
      getSensor(sensorId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改传感器管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.sensorId != null) {
            updateSensor(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSensor(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const sensorIds = row.sensorId || this.ids;
      this.$modal.confirm('是否确认删除传感器管理编号为"' + sensorIds + '"的数据项？').then(function () {
        return delSensor(sensorIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drone_system/sensor/export', {
        ...this.queryParams
      }, `sensor_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
