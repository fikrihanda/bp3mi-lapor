import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { jwtKey } = useRuntimeConfig(event)

  const body = await readBody<{
    email: string
    password: string
  }>(event)

  return await prisma.$transaction(async (tx) => {
    const user = await tx.users.findUnique({
      where: {
        email: body.email,
      },
      include: {
        roles: true,
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
        status: 404,
        statusText: 'User not found',
      })
    }

    const checkPass = await bcrypt.compare(body.password, user.password)

    if (!checkPass) {
      throw createError({
        status: 404,
        statusText: 'Password is wrong',
      })
    }

    if (user?.roles?.name !== 'Super Admin') {
      if (user.otpsecret) {
        return {
          needOtp: true,
        }
      }
    }

    const { refreshToken, accessToken } = await jwtAll({
      email: user.email,
      id: user.id,
    }, jwtKey)

    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400,
    })

    return {
      token: accessToken,
      info: {
        email: user.email,
        id: user.id,
        role: user.roles,
        profile: user.usersprofile,
      },
    }
  })
})
