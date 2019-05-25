import React, { Fragment, FunctionComponent } from 'react'
import classNames from 'classnames'
import styles from '../styles.css'

interface Props {
  text: string
  threshold: number
}
// <div className={classNames(styles.productAvailabilityContainer, 'flex pa2')}>

const LowStock: FunctionComponent<Props> = ({ text, threshold }) => {
  const [before, after] = text.split('{quantity}')
  return (
    <Fragment>
      {before && <span className={classNames(styles.lowStockText, 'c-muted-2 t-small')}>{before}</span>}
      {threshold && <span className={classNames(styles.lowStockHighlight, 'c-muted-2 t-small b mh1')}>{threshold}</span>}
      {after && <span className={classNames(styles.lowStockText, 'c-muted-2 t-small')}>{after}</span>}
    </Fragment>
  )
}

export default LowStock
