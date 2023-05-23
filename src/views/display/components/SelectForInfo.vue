<template>
  <div>
    <el-select v-model="value" placeholder="选择查看的无人机" style="margin-left:10px">
        <el-option v-for="item in uavs" :key="item.value" :label="item.label" :value="item.value" >
        <span style="float: left">{{ item.label }}</span>
        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uavs: [
        {
          value: 'uav01',
          label: 'uav01-JCV600'
        }, {
          value: 'uav02',
          label: 'uav02-JCV600'
        }, {
          value: 'uav03',
          label: 'uav03-JCV410'
        }, {
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
  }
}
</script>