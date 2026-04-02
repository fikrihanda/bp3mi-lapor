export default defineEventHandler({
  onRequest: [tokenRefresh],
  async handler(event) {
    const { jwtKey } = useRuntimeConfig(event)

    const userRefresh = event.context.user

    const accessToken = await jwtEncode({
      user: `${userRefresh.email}#${userRefresh.id}`,
    }, jwtKey, {
      expiresIn: '1m',
    })

    return { accessToken }
  },
})
