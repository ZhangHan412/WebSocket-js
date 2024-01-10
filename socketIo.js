/***
 * 使用 socket.io 框架
 */
const http = require('http')
const fs = require('fs')
const app = http.createServer()
app.on('request', (req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500)
            return res.end('Error')
        }
        res.writeHead(200)
        res.end(data)
    })
})
app.listen(3000)

const io = require('socket.io')(app)
/****
 * connection 监听用户连接事件
 * 只会在用户连接到服务器成功后调用一次
 * 
 * disconnect 客户端断开服务端事件
 * 
 * error 客户端或者服务端发生错误触发事件
 * 
 * reconnect 客户端重新连接触发该事件
 * 
 * reconnecting 客户端正在尝试重新连接服务器调用该事件
 * 
 * reconnect_failed 客户端尝试重新连接服务端失败触发
 * 
 * socket.join('房间名') socket.to('房间名') 将客户端加入到指定房间 是客户端可以接受该房间的广播
 * 
 * socket.leave('房间名') 将客户端从指定房间移除
 * 
 * io.to('房间名').emit(event,data) 向指定房间所有人广播
 * 
 * io.emit(event,data) 向所有客户端广播
 * 
 * socket 表示用户的连接
 * socket.emit 表示触发某个事件 
 * 具体使用看是哪一端
 * 如果是服务端 则用于从服务端向客户端发送数据
 * 如果是客户端 则用于向服务端发送数据
 * 
 * socket.on 表示注册某个事件
 * 如果是服务端 则表示从客户端接收发送的数据
 * 如果是客户端 则表示从服务端接收数据数据
 */
io.on('connection', socket => {
    console.log('socket服务已经启动');
    socket.username = Date.now() % 10000
    socket.join('room')

    io.to('room').emit('event', `用户${socket.username}加入该房间`)

    socket.on('disconnect', () => {
        console.log('当客户端断开连接时调用');
        socket.leave('room')
    })

    socket.on('error', error => {
        console.log('连接错误', error);
    })

    // socket.emit 方法表示给浏览器发送数据
    socket.emit('send', { name: 'zh' })
    // 注册事件
    socket.on('name', data => {
        console.log('客户端发送过来的数据', data);
        socket.emit('send', data)
    })

    socket.on('creatUser', data => {
        io.to('room').emit('event', `用户${data.name}加入该房间`)
    })
})
