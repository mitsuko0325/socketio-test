const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const io = require('socket.io')(server)

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

//onでemitで発火したのを検知
io.on('connection', (socket)=>{
    console.log('connected')
    //socket.on('disconnect', () => {
    //    console.log('disconnect')
    //    }
    //)

    socket.on('message', (msg)=>{
        console.log('message: ' + msg)

        //io()によって接続してきているクライアント全員にメッセージを送信
        io.emit('message', msg)
    })
})

server.listen(3000, ()=>{
    console.log('listening on port 3000')
})