export default defineRequestMiddleware(async (event) => {
  const { jwtKey } = useRuntimeConfig(event)
  const tokenRefresh = getCookie(event, 'refreshToken')

  if (!tokenRefresh) {
    throw createError({
      status: 403,
      statusMessage: 'Missing token refresh',
    })
  }

  let decode: { user: string } | undefined
  try {
    decode = await jwtDecode<{
      user: string
    }>(tokenRefresh, jwtKey)
  }
  catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw createError({
        status: 403,
        statusMessage: 'Token refresh expired',
      })
    }
    if (err.name === 'JsonWebTokenError') {
      throw createError({
        status: 403,
        statusMessage: 'Token refresh error',
      })
    }
  }

  const [email, id] = decode!.user.split('#')

  return prisma.$transaction(async (tx) => {
    const user = await tx.users.findUnique({
      where: {
        email,
        id,
      },
      select: {
        email: true,
        id: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
        usersprofile: {
          select: {
            name: true,
            photo_profile: true,
          },
        },
      },
    })
    if (!user) {
      throw createError({
        status: 403,
        statusMessage: 'Token refresh error',
      })
    }

    event.context.user = user
  })
})
