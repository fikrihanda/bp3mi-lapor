import type { ClassNamesArg, CSSInterpolation } from '@emotion/css/create-instance'
import { css, cx } from '@emotion/css'

export function useCss(...args: CSSInterpolation[]) {
  return css(...args)
}

export function useCx(...args: ClassNamesArg[]) {
  return cx(...args)
}
