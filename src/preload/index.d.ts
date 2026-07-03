import { ElectronAPI } from '@electron-toolkit/preload'

declare module '*.png?asset' {
  const src: string
  export default src
}

declare module '*.icns?asset' {
  const src: string
  export default src
}

declare module '*.ico?asset' {
  const src: string
  export default src
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    ipcRenderer:Electron.ipcRenderer
  }
}
