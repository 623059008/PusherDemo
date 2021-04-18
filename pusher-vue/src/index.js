import Vue from 'vue'
import App from './components/App.vue'
import { io } from "socket.io-client";

Vue.config.productionTip = false

const socket = io("http://localhost:8080");

new Vue({
  data: {
    socket: socket,
    progress: 'no',
    result: ''
  },
  el: '#app',
  mounted() {
    socket.emit('open', {data: 123});
    socket.on('scanResultReply', msg => {
      console.log(msg);
    });
    socket.on('scanProgressReply', msg => {
      console.log(msg);
    });
  },
  render: h => h(App)
})