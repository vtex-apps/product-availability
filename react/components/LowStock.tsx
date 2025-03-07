import React, { Fragment } from 'react'

import { useContextCssHandles } from './CssHandlesContext'

interface Props {
  text: string
  availableQuantity: number
}

function LowStock({ text, availableQuantity }: Props) {
  const { handles } = useContextCssHandles()
  const [before, after] = text.split('{quantity}')

  return (
    <Fragment>
      {before && (
        <span className={`${handles.lowStockText} c-muted-2 t-body`}>
          {before}
        </span>
      )}
      {availableQuantity && (
        <span className={`${handles.lowStockHighlight} c-muted-2 t-body b mh1`}>
          {availableQuantity}
        </span>
      )}
      {after && (
        <span className={`${handles.lowStockText} c-muted-2 t-body`}>
          {after}
        </span>
      )}
    </Fragment>
  )
}

export default LowStock
