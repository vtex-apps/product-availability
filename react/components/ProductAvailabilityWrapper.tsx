import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'
import { useIntl, defineMessages } from 'react-intl'

import ProductAvailability from './ProductAvailability'
import { CssHandlesProvider } from './CssHandlesContext'

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
  showAvailability?: 'stock' | 'disabled'
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
  const intl = useIntl()

  const formattedLowStockMessage = useMemo(
    () =>
      formatIOMessage({
        id: lowStockMessage,
        intl,
      }),
    [lowStockMessage, intl]
  ) as string

  const formattedHighStockMessage = useMemo(
    () =>
      formatIOMessage({
        id: highStockMessage,
        intl,
      }),
    [highStockMessage, intl]
  ) as string

  const formattedShowAvailabilityMessage = useMemo(
    () =>
      formatIOMessage({
        id: showAvailabilityMessage,
        intl,
      }),
    [showAvailabilityMessage, intl]
  ) as string

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
        lowStockMessage={formattedLowStockMessage}
        highStockMessage={formattedHighStockMessage}
        showAvailability={showAvailability}
        showAvailabilityMessage={formattedShowAvailabilityMessage}
        availableQuantity={availableQuantity}
      />
    </CssHandlesProvider>
  )
}

defineMessages({
  title: {
    defaultMessage: 'Product Availability',
    id: 'admin/editor.product-availability.title',
  },
  lowStockMessageTitle: {
    defaultMessage: 'Low stock message',
    id: 'admin/editor.product-availability.lowStockMessage.title',
  },
  lowStockMessageDescription: {
    defaultMessage:
      'Text to be shown to user when stock is lower than threshold. Should have {quantity} inside the given string, to be replaced for the threshold property. Example: "Only {quantity} left!". Leave empty to not show.',
    id: 'admin/editor.product-availability.lowStockMessage.description',
  },
  highStockMessageTitle: {
    defaultMessage: 'High stock message',
    id: 'admin/editor.product-availability.highStockMessage.title',
  },
  highStockMessageDescription: {
    defaultMessage:
      "Text to be shown when stock is higher or equal than threshold. If left empty, won't show",
    id: 'admin/editor.product-availability.highStockMessage.description',
  },
  showAvailabilityMessageTitle: {
    defaultMessage: 'Availability message',
    id: 'admin/editor.product-availability.showAvailabilityMessage.title',
  },
  showAvailabilityMessageDescription: {
    defaultMessage:
      'Text to be shown when "Enable availability message" option is set to "stock"',
    id: 'admin/editor.product-availability.showAvailabilityMessage.description',
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
  showAvailabilityTitle: {
    defaultMessage: 'Enable availability message',
    id: 'admin/editor.product-availability.showAvailability.title',
  },
  showAvailabilityDescription: {
    defaultMessage: 'Option to show availability',
    id: 'admin/editor.product-availability.showAvailability.description',
  },
})

ProductAvailabilityWrapper.schema = {
  title: 'admin/editor.product-availability.title',
}

export default ProductAvailabilityWrapper
