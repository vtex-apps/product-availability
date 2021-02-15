import React, { memo } from 'react'
import type { FunctionComponent } from 'react'
import classNames from 'classnames'

import styles from '../styles.css'
import LowStock from './LowStock'
import HighStock from './HighStock'

interface Props {
  threshold: number
  lowStockMessage: string
  highStockMessage: string
  availableQuantity: number | null | undefined
}

const Container: FunctionComponent = ({ children }) => {
  return (
    <div className={classNames(styles.container, 'flex pv2')}>{children}</div>
  )
}

const ProductAvailability: FunctionComponent<Props> = ({
  threshold,
  lowStockMessage,
  highStockMessage,
  availableQuantity,
}) => {
  if (availableQuantity == null || availableQuantity < 1) {
    return null
  }

  const isLowStock = availableQuantity < threshold

  if (isLowStock && lowStockMessage) {
    return (
      <Container>
        <LowStock
          text={lowStockMessage}
          availableQuantity={availableQuantity}
        />
      </Container>
    )
  }

  if (highStockMessage) {
    return (
      <Container>
        <HighStock text={highStockMessage} />
      </Container>
    )
  }

  return null
}

export default memo(ProductAvailability)
