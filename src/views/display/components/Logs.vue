<template>
  <div id="pie" :style="size">
    <!-- 上边框 -->
    <div class="dragRectTop"></div>

    <!-- <e-charts :size="size" :options="options" /> -->

    <div style="text-align:center; font-size:16px; margin-top:5px; margin-bottom:5px">无人机实时信息</div>
    <SelectForInfo></SelectForInfo>
    <!-- <hr>
    经度,,纬度 -->
    <div class="rectangle">
      经度 {{ lat }}
    </div>
    <div class="rectangle">
      纬度 {{ lon }}
    </div>
    <!-- <hr>
    高度 -->
    <div class="rectangle">
      高度 {{ high }}
    </div>
    <!-- <hr> -->
    <div class="rectangle">
      状态 {{ state }}
    </div>
    <!-- 状态 -->
    <!-- <hr> -->
    <div class="speedandbattery" :style="size2">
      <div class="left" style="color:white; font-size:14px">
        飞速
        <e-charts :size="size2" :options="options" style="margin-top:-15px" />
      </div>
      <div class="right" style="color:white; font-size:14px">
        电池
        <e-charts :size="size2" :options="batteryOption" style="margin-top:-15px" />
        <!-- <dv-percent-pond :style="sizebattery" :config="config" /> -->
      </div>

    </div>


    <!-- <hr> -->

    <!-- 下边框 -->
    <div class="dragRectBottom"></div>

  </div>
</template>

<script>
import { color } from 'echarts';
import ECharts from './ECharts'
import SelectForInfo from './SelectForInfo.vue';
// import * as  echarts from 'echarts';

// 请求无人机后端
// import {request} from '../../../network/netRequest'
// import { stringify } from 'qs';

export default {
  // el: '#pie',
  data: function () {
    return {
      lat: 39.086084235333566,
      lon: 121.80807899683717,
      high: 9.8,
      state: 'arming',
      // battery: 0,
      // speed: 0,
      size: {
        width: '100%',
        height: '7rem',
      },
      size2: {
        width: '100%',
        height: '2.5rem'
      },
      sizebattery: {
        width: '100%',
        // height: '1rem'
        height: '30%'
      },
      config: {
        value: 100,
        localGradient: true
      },
      options: {
        series: [
          {
            type: 'gauge',
            // 进度蓝色半圈
            progress: {
              show: true,
              width: 10,
              color: "green"
            },
            // 白半圈
            axisLine: {
              lineStyle: {
                width: 10
              },
              color: "#999"
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 0,
                color: '#999'
              }
            },
            // 仪表盘一圈数字
            axisLabel: {
              distance: 5,
              color: '#999',
              fontSize: 0
            },
            // 指针
            anchor: {
              show: true,
              showAbove: true,
              size: 10,
              itemStyle: {
                borderWidth: 2
              }
            },
            title: {
              show: false
            },
            // 实际数字
            detail: {
              valueAnimation: true,
              fontSize: 15,
              offsetCenter: [0, '70%'],
              formatter: '{value}m/s',
              color: '#999'
            },
            data: [
              {
                value: 8 
              }
            ]
          }
        ]
      },
      batteryOption: {
        series: [
          {
            type: 'gauge',
            progress: {
              show: true,
              width: 10
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.1, '#FF5722'], // 颜色渐变结束值及对应颜色
                  [0.7, '#FFC107'], // 颜色渐变中间值及对应颜色
                  [1, '#999'], // 颜色渐变起始值及对应颜色
                ]
              }
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: {
                color: '#FF5722' // 进度条颜色
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 0,
                color: '#FFC107'
              }
            },
            axisLabel: {
              distance: 5,
              color: '#FFC107',
              fontSize: 0
            },
            anchor: {
              itemStyle: {
                color: '#FF5722' // 指针颜色
              }
            },
            detail: {
              color: '#FF5722' // 实际数字颜色
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              formatter: '{value}%',
              offsetCenter: [0, '70%'],
              color: '#FFC107'
            },
            data: [
              {
                value: 90
              }
            ]
          }
        ]
      },
      websock: null,
    }
  },
  components: {
    ECharts,
    SelectForInfo
  },
  created() {
    // setInterval(() => {
    // this.initWebSocket();
    // },20000)

  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },

  methods: {
    initWebSocket() { //初始化weosocket
      const wsuri = "ws://127.0.0.1:8000/1/wstest";
      this.websock = new WebSocket(wsuri);

      this.websock.onmessage = this.websocketonmessage;
      // this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    // websocketonopen(){ //连接建立之后执行send方法发送数据
    //   let actions = {"test":"12345"};
    //   this.websocketsend(JSON.stringify(actions));
    // },
    websocketonerror() {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { //数据接收
      const redata = JSON.parse(e.data);
      // 电池
      this.config.value = parseInt(redata["bat"].remaining_percent * 100)
      console.log("this.config.value", this.config.value);
      this.config = { ...this.config }

      // 飞速
      this.options.series[0].data[0].value = parseInt(redata["bat"].remaining_percent * 100)

      // setInterval(()=>{
      this.options = { ...this.options }
      // },2000)
      // lat
      this.lat = redata["pos"].latitude_deg
      this.lon = redata["pos"].longitude_deg
      this.height = redata["pos"].relative_altitude_m
      // this.state = redata["bat"].state
    },
    // websocketsend(Data){//数据发送
    //   this.websock.send(Data);
    // },
    websocketclose(e) {  //关闭
      console.log('断开连接', e);
    },

  },
  //   watch: {
  //   // 监听options改变，重新生成图表
  //   options: function () {
  //     this.myChart.setOption(this.options)
  //   }
  // }
}
</script>

<style scoped>
#pie {
  /* background-image: url(../assets/line.png); */
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.speedandbattery {
  /* flex: 1; */
  width: 100%;
  padding: 0.15rem;
  display: flex;
  /* background-color: brown; */
  /* position: relative;
  left: 3%; */


}

.speedandbattery .left {
  flex: 0.5;
  background-color: rgb(63, 65, 179);
  border-radius: 6px;
  padding-top: 2%;
  margin-right: 1%;
  text-align: center;
}

.speedandbattery .right {
  flex: 0.5;
  background-color: rgb(63, 65, 179);

  margin-left: 1%;
  /* padding-top: 2%; */
  border-radius: 6px;
  text-align: center;

}

.rectangle {
  display: flex;
  flex-direction: column;
  width: 94%;
  /* display: flex; */
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: rgb(63, 65, 179);
  color: white;
  font-size: 14px;
  position: relative;
  left: 3%;
  border-radius: 6px;
  padding-left: 5%;
  margin-top: 5px;
  /* width: 32%; */
  height: 13%;
  /* .dv-dig-flop {
    width: 150px;
    height: 30px;
  } */

}

/* .rectangle  */


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
</style>