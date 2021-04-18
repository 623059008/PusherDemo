<template>
  <div id="app">
    <div class="banner">
      <h1>Pusher Demo</h1>
      <div id="result" class="button-group">
        <div>
          <button v-on:click="socket.emit('scanProgress', { data: 'scan progress' })">
            send scan progress
          </button>
        </div>
        <div id="progress">Progress: {{ progress || "暂无" }}</div>
        <div>
          <button v-on:click="socket.emit('scanResult', { data: 'send result' })">
            send scan result
          </button>
        </div>
        <div>Result: {{ result || "" }}</div>
      </div>
    </div>
    <div class="bottom">
      <pre>
        <code>
        # socket.io Events
        socket.on('scanResultReply', msg=>{
          console.log(msg);
        })
        socket.on('scanProgressReply', msg=>{
          console.log(msg);
        })
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");
export default {
  name: "app",
  data: () => {
    return {
      progress: "no progress",
      result: "waiting result",
      socket: socket,
    };
  },
  mounted() {
    socket.emit('open', {data: 123});
    socket.on('scanResultReply', msg => {
      console.log(msg);
      this.result = JSON.stringify(msg);
    });
    socket.on('scanProgressReply', msg => {
      console.log(msg);
      this.progress = JSON.stringify(msg);
    });
  },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: "`";
}
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
#app {
  text-align: center;
}

#app h1 {
  color: #2c3e50;
  font-weight: 300;
  margin: 0;
}

.banner {
  height: 200px;
  background-color: #f6f6f6;
  padding: 50px 10px;
}

.button-group {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-content: center;
}
.button-group button {
  width: 200px;
  margin-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.bottom {
  padding: 80px 10px;
  font-size: 24px;
  font-weight: 300;
  text-align: left;
}

.fade {
  font-size: 14px;
}
</style>
