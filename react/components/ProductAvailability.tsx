import React, { memo } from 'react'
import type { ProductTypes } from 'vtex.product-context'

import LowStock from './LowStock'
import HighStock from './HighStock'
import ShowAvailable from './ShowAvailable'
import Container from './Container'

interface Props {
  threshold: number
  lowStockMessage?: string
  highStockMessage?: string
  showAvailability?: 'disabled' | 'stock'
  showAvailabilityMessage?: string
  availableQuantity?: ProductTypes.CommercialOffer['AvailableQuantity']
}

function ProductAvailability({
  threshold,
  lowStockMessage,
  highStockMessage,
  showAvailability = 'disabled',
  showAvailabilityMessage,
  availableQuantity,
}: Props) {
  if (availableQuantity == null || availableQuantity < 0) {
    return null
  }

  const isLowStock = availableQuantity < threshold

  if (showAvailability === 'stock' && showAvailabilityMessage) {
    return (
      <Container>
        <ShowAvailable
          text={showAvailabilityMessage}
          availableQuantity={availableQuantity}
        />
      </Container>
    )
  }

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
