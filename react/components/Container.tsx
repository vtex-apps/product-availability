import React from 'react'
import type { PropsWithChildren } from 'react'
import { useIntl } from 'react-intl'

import { useContextCssHandles } from './CssHandlesContext'

function Container({ children }: PropsWithChildren<unknown>) {
  const { handles } = useContextCssHandles()
  const intl = useIntl()

  return (
    <div
      className={`${handles.container} flex pv2`}
      aria-label={intl.formatMessage({
        id: 'store/product-availability.container.aria-label',
      })}
    >
      {children}
    </div>
  )
}

export default Container
