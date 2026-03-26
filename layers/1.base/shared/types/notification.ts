export interface Notif {
  id?: string
  title: string
  text: string
  type: 'error' | 'success' | 'warning' | 'info'
}
