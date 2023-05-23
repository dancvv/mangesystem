<template>
    <div class="dashboard">
        <h1>无人机态势感知</h1>
        <div class="drone-status">
            <h2>无人机状态</h2>
            <p>位置: {{ droneStatus.location }}</p>
            <p>速度: {{ droneStatus.speed }}</p>
            <p>姿态: {{ droneStatus.attitude }}</p>
            <!-- <v-chart :options="batteryChartOptions" autoresize/> -->
            <!-- <v-chart :options="speedChartOptions" autoresize/> -->
            <p>电池状态: {{ droneStatus.battery }}</p>
            <p>飞行状态: {{ droneStatus.flightStatus }}</p>
        </div>
        <div class="communication-status">
            <h2>通信链路状态</h2>
            <p>{{ communicationStatus }}</p>
        </div>
        <div class="collision-risk">
            <h2>碰撞风险</h2>
            <p>{{ collisionRisk }}</p>
        </div>
        <div class="environment-info">
            <h2>环境感知信息</h2>
            <p>天气: {{ environmentInfo.weather }}</p>
            <p>地形: {{ environmentInfo.terrain }}</p>
        </div>
        <div class="warning-info">
            <h2>预警信息</h2>
            <p>{{ warningInfo }}</p>
        </div>
        <div class="anomaly-alert">
            <h2>异常行为提醒</h2>
            <p>{{ anomalyAlert }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import ECharts from 'vue-echarts'; // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';


export default {
    data() {
        return {
            // ...
            batteryChartOptions: {
                xAxis: {
                    type: 'category',
                    data: ['1分钟前', '2分钟前', '3分钟前', '4分钟前', '5分钟前'] // 模拟时间戳
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [98, 97, 96, 95, 94], // 模拟电池状态
                    type: 'line'
                }]
            },
            speedChartOptions: {
                xAxis: {
                    type: 'category',
                    data: ['1分钟前', '2分钟前', '3分钟前', '4分钟前', '5分钟前'] // 模拟时间戳
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [12, 14, 15, 13, 14], // 模拟速度
                    type: 'line'
                }]
            }
        };
    },

    created() {
        // this.fetchData();
        // this.timer = setInterval(this.fetchData, 5000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        fetchData() {
            axios.get('/api/droneStatus')
                .then(response => {
                    // ...
                    const timestamp = new Date().toLocaleTimeString();
                    this.batteryChartOptions.xAxis.data.push(timestamp);
                    this.batteryChartOptions.series[0].data.push(this.droneStatus.battery);
                    this.speedChartOptions.xAxis.data.push(timestamp);
                    this.speedChartOptions.series[0].data.push(this.droneStatus.speed);
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }
};
</script>

<style scoped>
.dashboard {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.dashboard>div {
    width: 30%;
    margin: 1em 0;
}
</style>
