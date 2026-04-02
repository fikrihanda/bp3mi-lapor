import { isEmpty } from 'lodash-es'

export default defineRequestMiddleware(async (event) => {
  const { jwtKey } = useRuntimeConfig(event)
  const tokenAccess = getHeader(event, 'Authorization')

  if (!tokenAccess) {
    throw createError({
      status: 403,
      statusMessage: 'Missing token access',
    })
  }

  const [_bearer, token] = tokenAccess.split(' ')

  if (isEmpty(token)) {
    throw createError({
      status: 403,
      statusMessage: 'Missing token access',
    })
  }

  let decode: { user: string } | undefined
  try {
    decode = await jwtDecode<{
      user: string
    }>(token!, jwtKey)
  }
  catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw createError({
        status: 401,
        statusMessage: 'Token access expired',
      })
    }
    if (err.name === 'JsonWebTokenError') {
      throw createError({
        status: 401,
        statusMessage: 'Token access error',
      })
    }
  }

  const userRefresh = event.context.user

  const [email, id] = decode!.user.split('#')

  if (
    !(userRefresh.email === email
      && userRefresh.id === id)
  ) {
    throw createError({
      status: 401,
      statusMessage: 'Token access error',
    })
  }
})
