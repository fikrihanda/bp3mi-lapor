export default defineNuxtPlugin(() => {
  const auth = useAuthStoreDashboard()

  const fetchDashboard = $fetch.create({
    retry: 1,
    retryStatusCodes: [401],
    onRequest({ options }) {
      if (auth.getToken) {
        const headers = options.headers || {}
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${auth.getToken}`])
        }
        else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${auth.getToken}`)
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        const { accessToken } = await $fetch('/api/dashboard/refresh', { method: 'POST' })
        auth.setToken(accessToken)
      }
      if (response.status === 403) {
        auth.setToken('')
        auth.setInfo(null)
      }
    },
  })

  return {
    provide: {
      fetchDashboard,
    },
  }
})
