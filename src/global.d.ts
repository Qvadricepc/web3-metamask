// global.d.ts

interface Window {
  ethereum?: {
    isMetaMask: boolean
    request: (args: { method: string; params?: any[] }) => Promise<any>
    on: (event: string, listener: (...args: any[]) => void) => void
    off: (event: string, listener: (...args: any[]) => void) => void
    removeListener(eventName: string, eventHandler: () => void): void
  }
}
