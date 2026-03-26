import { no } from 'vuetify/locale'

export interface Notif {
  id?: string
  title: string
  text: string
  type: 'error' | 'success' | 'warning' | 'info'
}

export function useNotification() {
  const appConfig = useAppConfig()

  const notification = inject(appConfig.notification)

  const show = function (notif: Notif) {
    if (!notification)
      return
    notification.value.push({
      ...notif,
      id: window.crypto.randomUUID(),
    })

    console.log(notification.value)
  }

  const destroy = function (notif: Notif) {
    if (!notification)
      return
    const find = notification.value.findIndex(c => c.id === notif.id)
    if (find !== -1) {
      notification.value.splice(find, 1)
    }
  }

  return { notification, show, destroy }
}
