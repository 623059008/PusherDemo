const fs = require("fs");
const httpServer = require("https").createServer({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
});

const io = require("socket.io")(httpServer, {});

const Errors = {
    1010: 'INVALID_PARAMS'
}
io.on("connection", (socket) => {
    socket.emit('connectionReply', { errno: 0, data: "connection esdablished successfully!" });
});

io.on("scanProgress", (socket) => {
    const data = this.wsData;
    const progress = data["progress"];
    const content = data["content"];
    if (!progress || !content) {
        socket.emit('scanProgressReply', { errno: 1010, errmsg: Errors["1010"] });
        return;
    }
    // do something on data
    socket.emit('scanProgressReply', { errno: 0, data: { success: true } });
});

io.on("scanResult", (socket) => {
    const data = this.wsData;
    const result = data["result"];
    if (!result) {
        socket.emit('scanResultReply', { errno: 1010, errmsg: Errors["1010"] });
        return;
    }
    // do something on data
    socket.emit('scanResultReply', { errno: 0, data: { success: true } });
});

httpServer.listen(8080);
console.log('[Server] Listen on port: 8080')