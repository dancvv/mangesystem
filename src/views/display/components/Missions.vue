<template>
  <div :style="size">
    <div class="dragRectTop"></div>

    <div style="text-align:center; font-size:16px; margin-top:5px; margin-bottom:5px">预警信息</div>
    <!-- <div style="text-align: center; margin-bottom:5px; margin-top:10px">任务信息</div> -->
    <el-table :data="tableData" style="width: 100%" :cell-class-name="tableRowClassName" max-height="540" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
      <el-table-column prop="riskItem" label="风险项" width="100" sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="riskContent" label="风险内容" width="260" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <!-- 多写几条不同类型的风险数据，至少20条，其中具体数据的内容要指明那台无人机的风险 -->
    
    <div class="dragRectBottom"></div>
  </div>
</template>



<script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.riskLevel === '高') {
        return 'risk-high';
      } else if (row.riskLevel === '中') {
        return 'risk-medium';
      } else if (row.riskLevel === '低') {
        return 'risk-low';
      }
      return '';
    },
    filterTag(value, row, column) {
      console.log(value)
      console.log(row)
      return row.riskItem === value;
    }
  },
  data() {
    return {
      size: {
        width: '100%',
        height: '10rem',
      },
      tableData: [
        { riskItem: '无人机网络监控', riskContent: '无人机#1网络状态不稳定', riskLevel: '高' },
        { riskItem: '碰撞监控', riskContent: '无人机#2距离无人机#3过近', riskLevel: '高' },
        { riskItem: '电池监控', riskContent: '无人机#4电池电量低', riskLevel: '高' },
        { riskItem: '无人机网络监控', riskContent: '无人机#2网络延迟过高', riskLevel: '中' },
        { riskItem: '碰撞监控', riskContent: '无人机#1距离无人机#4过近', riskLevel: '中' },
        { riskItem: '电池监控', riskContent: '无人机#3电池电量适中', riskLevel: '中' },
        { riskItem: '无人机网络监控', riskContent: '无人机#4网络状态正常', riskLevel: '低' },
        { riskItem: '碰撞监控', riskContent: '无人机#3距离其他无人机安全', riskLevel: '低' },
        { riskItem: '电池监控', riskContent: '无人机#1电池电量充足', riskLevel: '低' },
        { riskItem: '无人机网络监控', riskContent: '无人机#3网络出现波动', riskLevel: '中' },
        { riskItem: '碰撞监控', riskContent: '无人机#2距离无人机#1稍近', riskLevel: '中' },
        { riskItem: '电池监控', riskContent: '无人机#4电池电量较低', riskLevel: '高' },
        { riskItem: '无人机网络监控', riskContent: '无人机#2网络状态状态不稳定', riskLevel: '高' },
        { riskItem: '无人机网络监控', riskContent: '无人机#3网络状态正常', riskLevel: '低' },
        { riskItem: '碰撞监控', riskContent: '无人机#1距离无人机#2过近', riskLevel: '高' },
        { riskItem: '电池监控', riskContent: '无人机#2电池电量适中', riskLevel: '中' },
        { riskItem: '无人机网络监控', riskContent: '无人机#1网络延迟过高', riskLevel: '高' },
        { riskItem: '电池监控', riskContent: '无人机#3电池电量充足', riskLevel: '低' },
        { riskItem: '碰撞监控', riskContent: '无人机#3距离无人机#4安全距离', riskLevel: '低' },
        { riskItem: '无人机网络监控', riskContent: '无人机#2网络状态稳定', riskLevel: '低' },
        { riskItem: '电池监控', riskContent: '无人机#1电池电量即将耗尽', riskLevel: '高' },
        { riskItem: '无人机网络监控', riskContent: '无人机#4网络延迟严重', riskLevel: '高' },
        { riskItem: '碰撞监控', riskContent: '无人机#1与无人机#2接近冲突', riskLevel: '高' },
        { riskItem: '电池监控', riskContent: '无人机#3电池电量充足', riskLevel: '低' },
        { riskItem: '无人机网络监控', riskContent: '无人机#1网络连接正常', riskLevel: '低' },
        { riskItem: '碰撞监控', riskContent: '无人机#2距离无人机#3保持安全距离', riskLevel: '低' },
        { riskItem: '电池监控', riskContent: '无人机#4电池电量即将耗尽', riskLevel: '高' },
        { riskItem: '无人机网络监控', riskContent: '无人机#3网络信号弱', riskLevel: '中' },
        { riskItem: '碰撞监控', riskContent: '无人机#4距离无人机#1稍近', riskLevel: '中' },
        { riskItem: '电池监控', riskContent: '无人机#2电池电量适中', riskLevel: '中' },
      ]
    }
  }
}

</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.dragRectTop {
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0
}

.dragRectTop::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 2px solid skyblue;
  border-top: 2px solid skyblue;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
}

.dragRectTop::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid skyblue;
  border-top: 2px solid skyblue;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.dragRectBottom {
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0
}

.dragRectBottom::before {
  content: "";
  width: 10px;
  height: 10px;
  border-left: 2px solid skyblue;
  border-bottom: 2px solid skyblue;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
}

.dragRectBottom::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid skyblue;
  border-bottom: 2px solid skyblue;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}

.risk-high {
  background-color: #f56c6c;
}
.risk-medium {
  background-color: #e6a23c;
}
.risk-low {
  background-color: #67c23a;
}

</style>