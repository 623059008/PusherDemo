const fs = require("fs");
const options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
};
const app = require('express')();
var cors = require('cors')
const httpServer = require('http').Server(app);


const io = require('socket.io')(httpServer, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
});


app.use(cors());

io.on("connect", (socket) => {
    socket.emit('connectionReply', { errno: 0, data: "connection esdablished successfully!" });
});

io.on('connection', function (socket) {
    socket.on("scanResult", (msg) => {
        // do something on data
        io.emit('scanResultReply', { errno: 0, data: { success: true, msg } });
    });
    socket.on("scanProgress", (msg) => {
        // do something on data
        socket.emit('scanProgressReply', { errno: 0, data: { success: true, msg } });
    });
});


httpServer.listen(8080, function () {
    console.log('listening on *:8080');
});