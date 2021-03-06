import React from 'react'
import type { PropsWithChildren } from 'react'

import { useContextCssHandles } from './CssHandlesContext'

function Container({ children }: PropsWithChildren<unknown>) {
  const { handles } = useContextCssHandles()

  return <div className={`${handles.container} flex pv2`}>{children}</div>
}

export default Container
