import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import styles from '../styles.css'

interface Props {
  text: string
}

const HighStock: FunctionComponent<Props> = ({ text }) =>
  <span className={classNames(styles.highStockText, 'c-muted-2 t-body')}>{text}</span>

export default HighStock