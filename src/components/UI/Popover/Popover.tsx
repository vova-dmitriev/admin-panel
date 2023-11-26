import React, { FC } from 'react'
import clsx from 'clsx'
import styles from './Popover.module.scss'

export interface IPopoverItem {
  text: string
  handler: (data?: any) => void
  disabled: boolean
  visible?: boolean
}

interface IPopoverProps {
  items: IPopoverItem[]
}

export const Popover: FC<IPopoverProps> = ({ items = [] }) => {
  const handleClick = (e: React.MouseEvent, item: IPopoverItem) => {
    e.stopPropagation()
    if (item.disabled) return
    item.handler()
  }

  return (
    <div className={styles.popover}>
      {items.map(item => (
        <div
          key={item.text}
          className={clsx(styles.item, item.visible === false && styles.itemHidden)}
          onClick={e => handleClick(e, item)}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
