import React, { memo } from 'react'
import type { ProductTypes } from 'vtex.product-context'

import LowStock from './LowStock'
import HighStock from './HighStock'
import Container from './Container'

interface Props {
  threshold: number
  lowStockMessage?: string
  highStockMessage?: string
  availableQuantity?: ProductTypes.CommercialOffer['AvailableQuantity']
}

function ProductAvailability({
  threshold,
  lowStockMessage,
  highStockMessage,
  availableQuantity,
}: Props) {
  if (
    availableQuantity == null ||
    availableQuantity === undefined ||
    availableQuantity < 1
  ) {
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

  if (!highStockMessage) {
    return null
  }

  return (
    <Container>
      <HighStock text={highStockMessage} />
    </Container>
  )
}

export default memo(ProductAvailability)
