<template>
  <div>
    <el-select v-model="value" placeholder="选择无人机" @change="handleUAVChange()">
      <el-option v-for="item in uavs" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span> -->
      </el-option>
    </el-select>
    <el-switch v-model="static" active-color="#13ce66" inactive-color="#ff4949" @change="handleChange()">
    </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      static: false,
      uavs: [
        {
          value: 'uav01',
          label: 'uav01-JCV600'
        },{
          value: 'uav02',
          label: 'uav02-JCV600'
        },{
          value: 'uav03',
          label: 'uav03-JCV410'
        },{
          value: 'uav05',
          label: 'uav05-JCV410'
        },
      ],
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
      this.static = false;
    },
    handleChange(value) {
      // this.static = true;
      if (this.static !== true) {
        return
      }
      this.$confirm('是否切换无人机，切换可能导致任务丢失', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '切换成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '切换失败'
        });
      });
    }
  },
}
</script>