<template>
  <div>
    <el-select v-model="value" placeholder="选择查看的无人机">
        <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          label: 'uav01',
          value: 'JCV600'
        }, {
          label: 'uav02',
          value: 'JCV600'
          },{
          label: 'uav05',
          value: 'JCV410'
          },{
          label: 'uav06',
          value: 'JCV600'
          },{
          label: 'uav08',
          value: 'JCV410'
          },
        ],
        value: ''
      }
    }
  }
</script>