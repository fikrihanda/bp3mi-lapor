import { OTP } from 'otplib'

export const otp = new OTP({
  strategy: 'totp',
})
