const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws')
const port=3500
const wss = new WebSocket.Server({server:server})

wss.on('connection', function connection(ws) {
    let time = new Date();
    console.log('New Client is connected');

    ws.on('message', function incoming(message) {
    let curr_time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    ws.send(JSON.stringify({"msg":"You  request => "+ message,"time":curr_time  ,"user":true}));
    });
    ws.on('close', function close() {
        console.log('Client disconnected');
    });

});


app.get('/',(req,res) => {
    res.send('hello world');
})

server.listen(port, () => console.log(`Server is Runing On ${port}`))