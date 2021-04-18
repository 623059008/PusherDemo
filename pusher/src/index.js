import Vue from 'vue'
import App from './components/App.vue'
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "127.0.0.1:8080",
  })
);
new Vue({
  el: '#app',
  mounted() {
    this.$socket.emit('connection', {data: 123});
  },
  render: h => h(App)
})
