<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务编号" prop="taskNumber">
        <el-input v-model="queryParams.taskNumber" placeholder="请输入任务编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="任务优先级" prop="taskPriority">
        <el-input v-model="queryParams.taskPriority" placeholder="请输入任务优先级" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="经度" prop="lat">
        <el-input v-model="queryParams.lat" placeholder="请输入经度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="纬度" prop="lng">
        <el-input v-model="queryParams.lng" placeholder="请输入纬度" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="任务耗能" prop="energyRequirement">
        <el-input v-model="queryParams.energyRequirement" placeholder="请输入任务耗能" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="时间" prop="dateTime">
        <el-date-picker clearable v-model="queryParams.dateTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务是否执行" prop="isExecute">
        <el-input v-model="queryParams.isExecute" placeholder="请输入任务是否执行" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['drone_system:plan:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['drone_system:plan:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['drone_system:plan:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['drone_system:plan:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="planList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="kcenter" prop="id" show-overflow-tooltip /> -->
      <el-table-column label="任务编号" align="center" prop="taskNumber" />
      <el-table-column label="任务优先级" align="center" prop="taskPriority" />
      <el-table-column label="经度" align="center" prop="lat" />
      <el-table-column label="纬度" align="center" prop="lng" />
      <el-table-column label="任务耗能" align="center" prop="energyRequirement" />
      <el-table-column label="时间" align="center" prop="dateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dateTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="任务是否执行" align="center" prop="isExecute"></el-table-column> -->
      <el-table-column label="任务是否执行" align="center" >
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.isExecute === 1">{{ scope.row.isExecute }}</el-tag>
          <el-tag type="warning" v-if="scope.row.isExecute === 0">未完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['drone_system:plan:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['drone_system:plan:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改任务管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="任务编号" prop="taskNumber">
          <el-input v-model="form.taskNumber" placeholder="请输入任务编号" />
        </el-form-item>
        <el-form-item label="任务优先级" prop="taskPriority">
          <el-input v-model="form.taskPriority" placeholder="请输入任务优先级" />
        </el-form-item>
        <el-form-item label="经度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="任务耗能" prop="energyRequirement">
          <el-input v-model="form.energyRequirement" placeholder="请输入任务耗能" />
        </el-form-item>
        <el-form-item label="时间" prop="dateTime">
          <el-date-picker clearable v-model="form.dateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务是否执行" prop="isExecute">
          <el-input v-model="form.isExecute" placeholder="请输入任务是否执行" />
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
import { listPlan, getPlan, delPlan, addPlan, updatePlan } from "@/api/drone_system/plan";

export default {
  name: "Plan",
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
      // 任务管理表格数据
      planList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskNumber: null,
        taskPriority: null,
        lat: null,
        lng: null,
        energyRequirement: null,
        dateTime: null,
        isExecute: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        taskNumber: [
          { required: true, message: "任务编号不能为空", trigger: "blur" }
        ],
        taskPriority: [
          { required: true, message: "任务优先级不能为空", trigger: "blur" }
        ],
        lat: [
          { required: true, message: "经度不能为空", trigger: "blur" }
        ],
        lng: [
          { required: true, message: "纬度不能为空", trigger: "blur" }
        ],
        energyRequirement: [
          { required: true, message: "任务耗能不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询任务管理列表 */
    getList() {
      this.loading = true;
      listPlan(this.queryParams).then(response => {
        this.planList = response.rows;
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
        id: null,
        taskNumber: null,
        taskPriority: null,
        lat: null,
        lng: null,
        energyRequirement: null,
        dateTime: null,
        isExecute: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加任务管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPlan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改任务管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlan(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除任务管理编号为"' + ids + '"的数据项？').then(function () {
        return delPlan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drone_system/plan/export', {
        ...this.queryParams
      }, `plan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
