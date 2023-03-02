<template>
  <div>
    <el-select v-model="value" placeholder="选择无人机" change="handleUAVChange">
      <el-option v-for="item in cities" :key="item.label" :label="item.value" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
    <el-switch v-model="static" active-color="#13ce66" inactive-color="#ff4949" :change="handleChange()">
    </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      static: false,
      cities: [{
        label: 'uav01',
        value: 'JCV600'
      }, {
        label: 'uav02',
        value: 'JCV600'
      }, {
        label: 'uav05',
        value: 'JCV410'
      }, {
        label: 'uav06',
        value: 'JCV600'
      }, {
        label: 'uav08',
        value: 'JCV410'
      },
      ],
      value: ''
    }
  },
  methods: {
    handleUAVChange() {
      // this.static = false;
    },
    handleChange(value) {
      // this.static = true;
      // this.$confirm('是否切换执行的无人机', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '切换成功'
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '切换失败'
      //   });
      // });
    }
  },
}
</script>