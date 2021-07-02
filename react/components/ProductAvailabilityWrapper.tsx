import React from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { defineMessages } from 'react-intl'

import ProductAvailability from './ProductAvailability'
import { CssHandlesProvider } from './CssHandlesContext'

const messages = defineMessages({
  title: {
    defaultMessage: 'Product Availability',
    id: 'admin/editor.product-availability.title',
  },
  description: {
    defaultMessage: 'Component that shows the remaining available quantity',
    id: 'admin/editor.product-availability.description',
  },
  thresholdTitle: {
    defaultMessage: 'Threshold quantity',
    id: 'admin/editor.product-availability.threshold.title',
  },
  thresholdDescription: {
    defaultMessage:
      'Minimum quantity that makes low stock message appear (if message is set)',
    id: 'admin/editor.product-availability.threshold.description',
  },
  lowStockMessageTitle: {
    defaultMessage: 'Low stock message',
    id: 'admin/editor.product-availability.lowStockMessage.title',
  },
  lowStockMessageDescription: {
    defaultMessage:
      'String to be shown to user when stock is lower than threshold. Should have {quantity} inside the given string, to be replaced for the threshold property. Example: "Only {quantity} left!". Leave empty to not show.',
    id: 'admin/editor.product-availability.lowStockMessage.description',
  },
  highStockMessageTitle: {
    defaultMessage: 'High stock message',
    id: 'admin/editor.product-availability.highStockMessage.title',
  },
  highStockMessageDescription: {
    defaultMessage:
      "String to be shown when stock is higher or equal than threshold. If left empty, won't show",
    id: 'admin/editor.product-availability.highStockMessage.description',
  },
  showAvailabilityMessageTitle: {
    defaultMessage: 'Show available Message',
    id: 'admin/editor.product-availability.showAvailabilityMessage.title',
  },
  showAvailabilityMessageDescription: {
    defaultMessage: 'String to be shown when show available option is true',
    id: 'admin/editor.product-availability.showAvailabilityMessage.description',
  },
})

const CONTAINER_CSS_HANDLES = ['container'] as const
const LOW_STOCK_CSS_HANDLES = ['lowStockText', 'lowStockHighlight'] as const
const HIGH_STOCK_CSS_HANDLES = ['highStockText'] as const
const SHOW_AVAILABLE_CSS_HANDLES = [
  'showAvailableText',
  'showAvailableTextHighlight',
] as const

export const CSS_HANDLES = [
  ...CONTAINER_CSS_HANDLES,
  ...LOW_STOCK_CSS_HANDLES,
  ...HIGH_STOCK_CSS_HANDLES,
  ...SHOW_AVAILABLE_CSS_HANDLES,
] as const

export function getFirstAvailableSeller(sellers?: ProductTypes.Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const availableSeller = sellers.find(
    seller => seller.commertialOffer.AvailableQuantity !== 0
  )

  return availableSeller
}

interface Props {
  threshold: number
  lowStockMessage?: string
  highStockMessage?: string
  showAvailability?: 'stock'
  showAvailabilityMessage?: string
  classes?: CssHandlesTypes.CustomClasses<
    typeof CONTAINER_CSS_HANDLES &
      (
        | typeof LOW_STOCK_CSS_HANDLES
        | typeof HIGH_STOCK_CSS_HANDLES
        | typeof SHOW_AVAILABLE_CSS_HANDLES
      )
  >
}

function ProductAvailabilityWrapper({
  threshold = 0,
  lowStockMessage,
  highStockMessage,
  showAvailability,
  showAvailabilityMessage,
  classes,
}: Props) {
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const productContextValue = useProduct()

  if (!productContextValue) {
    return null
  }

  const seller = getFirstAvailableSeller(
    productContextValue.selectedItem?.sellers
  )

  const availableQuantity = seller?.commertialOffer.AvailableQuantity

  return (
    <CssHandlesProvider handles={handles} withModifiers={withModifiers}>
      <ProductAvailability
        threshold={threshold}
        lowStockMessage={lowStockMessage}
        highStockMessage={highStockMessage}
        showAvailability={showAvailability}
        showAvailabilityMessage={showAvailabilityMessage}
        availableQuantity={availableQuantity}
      />
    </CssHandlesProvider>
  )
}

ProductAvailabilityWrapper.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    threshold: {
      title: messages.thresholdTitle.id,
      description: messages.thresholdDescription.id,
      type: 'number',
      default: 0,
      isLayout: true,
    },
    lowStockMessage: {
      title: messages.lowStockMessageTitle.id,
      description: messages.lowStockMessageDescription.id,
      type: 'string',
    },
    highStockMessage: {
      title: messages.highStockMessageTitle.id,
      description: messages.highStockMessageDescription.id,
      type: 'string',
    },
    showAvailabilityMessage: {
      title: messages.showAvailabilityMessageTitle.id,
      description: messages.showAvailabilityMessageDescription.id,
      type: 'string',
    },
  },
}

export default ProductAvailabilityWrapper
