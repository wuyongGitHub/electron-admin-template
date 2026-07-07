/// <reference types="electron-vite/node" />
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    frame: false, // 无边框窗口
    autoHideMenuBar: true,
    alwaysOnTop: true, // 窗口置顶,永远最上层
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow = win
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 最小化窗口
  ipcMain.handle('minimize-login', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.minimize()
  })

  // 关闭登录窗口
  ipcMain.handle('close-login', () => {
    app.quit()
  })

  // 微信扫码登录
  ipcMain.handle('weChat-login', (_event, data) => {
    const weixinWidows = new BrowserWindow({
      minWidth: 900,
      minHeight: 670,
      // resizable: false, // 无法调整窗口大小
      show: false,
      autoHideMenuBar: true,
      // titleBarStyle: 'hidden',
      frame: false, // 无边框窗口
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    weixinWidows.on('ready-to-show', () => {
      weixinWidows.show()
    })
    // 打开微信提供的页面
    weixinWidows.loadURL('https://www.baidu.com')

    // 监听所有类型的 URL 变化
    const handleUrlChange = (): void => {
      console.log('URL changed:', weixinWidows.webContents.getURL())
    }

    weixinWidows.webContents.on('will-navigate', (_e, url) => {
      console.log('will-navigate:', url)
    })

    weixinWidows.webContents.on('did-navigate', (_e, url) => {
      console.log('did-navigate:', url)
    })

    weixinWidows.webContents.on('did-navigate-in-page', (_e, url) => {
      console.log('did-navigate-in-page:', url)
    })

    weixinWidows.webContents.on('did-redirect-navigation', (_e, url) => {
      console.log('did-redirect-navigation:', url)
    })
  })

  // 窗口拖拽吸附
  ipcMain.handle('custom-adsorption', (_event, data) => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.setPosition(data.appX, data.appY)
    }
  })

  // 窗口大小调整（登录成功后进入主界面）
  ipcMain.handle('resize-window', () => {
    if (!mainWindow) return
    // 取消置顶
    mainWindow.setAlwaysOnTop(false)
    // 窗口大小可以修改
    mainWindow.setResizable(true)
    // 窗口最小值
    mainWindow.setMinimumSize(1000, 500)
    // 窗口大小
    mainWindow.setSize(1200, 720)
    // 窗口居中
    mainWindow.center()
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
