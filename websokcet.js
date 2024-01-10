/****
 * WebSocket 一种双工的网络通信协议
 * 
 * 1.为什么需要WebSocket
 * 常用的HTTP协议只能从客户端发起请求然后服务端给我们返回信息 无法由服务端主动发给客户端信息
 * 而WebSocket可以主动给客户端发送信息
 * 
 */
const ws = require('nodejs-websocket')
// 只要有用户连接 就会给用户创建 connect 对象
const server = ws.createServer(connect => {
    console.log('用户已连接');
    // 创建 text 事件  
    connect.on('text', data => {
        console.log('用户输入的内容是:', data);
        // 响应用户数据
        connect.send(`这是您发的消息${data}`)
    })

    // 连接断开事件
    connect.on('close', () => {
        console.log('链接断开');
    })
    // 注册 error 事件 处理用户错误信息
    connect.on('error', () => {
        console.log('连接异常');
    })
})
server.listen(3000, () => {
    console.log('socket服务启动,端口3000');
})