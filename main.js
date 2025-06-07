// CommonJS语法：require(...) 是Node中加载模块的方式，返回模块的导出对象
// {app, BrowserWindow} 从 require(...) 返回的对象中按键名(id)取值
// app 是 electron 的模块，控制程序的事件生命周期
// BrowserWindow 模块创建和管理app的窗口
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// () => {} 箭头函数
// 这里是将这个箭头函数赋值给createWindow变量了，可以通过createWindow()调用
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') // 将预加载脚本附加到渲染进程
        },
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow() // 应用中的每个页面都在一个单独的进程中运行，我们称这些进程为 渲染器 (renderer) 

    // .on(event, listener) 是Node风格的事件注册
    // 这段代码仅针对macos
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// .on(event, listener) 是Node风格的事件注册
// Windows和Linux上通常希望所有的窗口关闭时退出，mac则不是
app.on('window-all-closed', () => {
    // nodejs的process.platform变量检查了当前的平台
    if (process.platform !== 'darwin') { // 判断是否为mac
        app.quit()
    }
})