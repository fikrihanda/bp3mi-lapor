export default defineAppConfig({
  notification: Symbol('notification') as InjectionKey<Ref<Notif[]>>,
})
