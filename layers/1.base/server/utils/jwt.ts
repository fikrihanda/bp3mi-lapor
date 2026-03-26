import type { PrivateKey, PublicKey, Secret, SignOptions } from 'jsonwebtoken'
import type { Buffer } from 'node:buffer'
import jwt from 'jsonwebtoken'

export function jwtEncode(
  payload: string | object | Buffer<ArrayBufferLike>,
  secret: Secret | PrivateKey,
  options: SignOptions,
): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(payload, secret, options, (err, encoded) => {
      if (err)
        return rej(err)
      if (!encoded)
        return rej(new Error('Token encoding failed'))
      return res(encoded)
    })
  })
}

export function jwtDecode<T>(
  token: string,
  secret: Secret | PublicKey,
): Promise<T> {
  return new Promise((res, rej) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err)
        return rej(err)
      if (!decoded)
        return rej(new Error('Token decoding failed'))
      return res(decoded as T)
    })
  })
}

export async function jwtAll(payload: string | object | Buffer<ArrayBufferLike>, jwtKey: Secret | PrivateKey) {
  const refreshToken = await jwtEncode(payload, jwtKey, {
    expiresIn: '1d',
  })
  const accessToken = await jwtEncode(payload, jwtKey, {
    expiresIn: '1m',
  })
  return { refreshToken, accessToken }
}
