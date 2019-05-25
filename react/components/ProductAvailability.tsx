import React, { FunctionComponent, useContext } from 'react'
import { isEmpty, path } from 'ramda'
import { ProductContext } from 'vtex.product-context'
import classNames from 'classnames'
import { defineMessages } from 'react-intl'

import styles from '../styles.css'

import LowStock from './LowStock'
import HighStock from './HighStock'

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
    defaultMessage: 'Minimum quantity that makes low stock message appear (if message is set)',
    id: 'admin/editor.product-availability.threshold.description',
  },
  lowStockMessageTitle: {
    defaultMessage: 'Low stock message',
    id: 'admin/editor.product-availability.lowStockMessage.title',
  },
  lowStockMessageDescription: {
    defaultMessage: 'String to be shown to user when stock is lower than threshold. Should have {quantity} inside the given string, to be replaced for the threshold property. Example: \"Only {quantity} left!\". Leave empty to not show.',
    id: 'admin/editor.product-availability.lowStockMessage.description',
  },
  highStockMessageTitle: {
    defaultMessage: 'High stock message',
    id: 'admin/editor.product-availability.highStockMessage.title',
  },
  highStockMessageDescription: {
    defaultMessage: 'String to be shown when stock is higher or equal than threshold. If left empty, won\'t show',
    id: 'admin/editor.product-availability.highStockMessage.description',
  },
})

interface Props {
  threshold: number
  lowStockMessage: string
  highStockMessage: string
}

const Container: FunctionComponent = ({ children }) => {
  return (
    <div className={classNames(styles.container, 'flex pv2')}>
      {children}
    </div>
  )
}

const ProductAvailability: StorefrontFunctionComponent<Props> = ({ threshold, lowStockMessage, highStockMessage }) => {
  const valuesFromContext = useContext(ProductContext)
  if (!valuesFromContext || isEmpty(valuesFromContext)) return null
  const { selectedItem } = valuesFromContext
  const availableQuantity = path(['sellers', 0, 'commertialOffer', 'AvailableQuantity'], selectedItem)
  if (availableQuantity == null || availableQuantity === 0) {
    return null
  }
  const isLowStock = availableQuantity < threshold
  if (isLowStock && lowStockMessage) {
    return (
      <Container>
        <LowStock text={lowStockMessage} threshold={threshold} />
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

ProductAvailability.defaultProps = {
  threshold: 0,
}

ProductAvailability.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    threshold: {
      title: messages.thresholdTitle.id,
      description: messages.thresholdDescription.id,
      type: 'number',
      default: 0,
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
    }
  },
}

export default ProductAvailability