const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const log = require('electron-log')
log.transports.file.level = 'debug'

const createWindow = () => {
    log.info('Creating BrowserWindow...')
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    win.webContents.openDevTools() // 打开渲染器 DevTools
    win.loadFile('index.html')
        .then(() => log.info('load index.html done'))
        .catch(err => log.error('load index.html failed: ', err))
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
})