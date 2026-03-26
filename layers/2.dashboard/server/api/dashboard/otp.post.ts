import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { jwtKey } = useRuntimeConfig(event)

  const body = await readBody<{
    email: string
    password: string
    token: string
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

    if (!user.otpsecret) {
      throw createError({
        status: 500,
        statusText: 'You don\'t set OTP',
      })
    }

    const isValidOtp = await otp.verify({
      token: body.token,
      secret: user.otpsecret,
    })

    if (!isValidOtp) {
      throw createError({
        status: 500,
        statusText: 'Your OTP is wrong',
      })
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
