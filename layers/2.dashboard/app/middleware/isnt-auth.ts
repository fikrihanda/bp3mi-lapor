export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStoreDashboard()

  if (auth.getToken) {
    return navigateTo('/dashboard')
  }
})
