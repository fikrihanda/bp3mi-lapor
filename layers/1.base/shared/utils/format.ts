import { isEmpty, isNumber, isString } from 'lodash-es'

export function parseNumber(val: any, type: 'int' | 'float' = 'int') {
  if (isNumber(val))
    return val
  if (isString(val)) {
    let typ = Number.parseInt
    if (type === 'float')
      typ = Number.parseFloat
    return typ(val)
  }
  return Number.NaN
}

export function parseEmpty(val: any) {
  if (isEmpty(val))
    return null
  return val
}
