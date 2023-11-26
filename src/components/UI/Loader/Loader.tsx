import { FC } from 'react'

import styles from './Loader.module.scss'

interface ILoaderProps {
  visible?: boolean
}

export const Loader: FC<ILoaderProps> = ({ visible = true }) => {
  if (!visible) {
    return null
  }

  return (
    <div className={styles.loader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  )
}
