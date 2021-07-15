import React, { Fragment } from 'react'

import { useContextCssHandles } from './CssHandlesContext'

interface Props {
  text: string
  availableQuantity: number
}

function ShowAvailable({ text, availableQuantity }: Props) {
  const { handles } = useContextCssHandles()
  const [before, after] = text.split('{quantity}')

  return (
    <Fragment>
      {before && (
        <span className={`${handles.showAvailableText} c-muted-2 t-body`}>
          {before}
        </span>
      )}
      {availableQuantity && (
        <span
          className={`${handles.showAvailableTextHighlight} c-muted-2 t-body b mh1`}
        >
          {availableQuantity}
        </span>
      )}
      {after && (
        <span className={`${handles.showAvailableText} c-muted-2 t-body`}>
          {after}
        </span>
      )}
    </Fragment>
  )
}

export default ShowAvailable
