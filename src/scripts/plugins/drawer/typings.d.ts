interface Window {
  Drawer: {
    close: (id: string) => void,
    open: (id: string) => void,
    toggle: (id: string) => void,
  },
}