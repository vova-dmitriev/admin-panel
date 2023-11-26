import React, { FC } from 'react'

import styles from './Model.module.scss'
import { Cross } from '@/assets/icons'
import clsx from 'clsx'
import { Button } from '@/components/UI'
import { IButtonProps } from '@/components/UI/Button/Button'

interface IActionButtonProps {
  label: string
  onClick: () => void
  className?: string
  props?: Partial<IButtonProps>
}

interface IModalProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
  actions?: IActionButtonProps[]
  titleClassName?: string
  showCloseBtn?: boolean
}

export const Modal: FC<IModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  actions,
  titleClassName,
  showCloseBtn = true,
}) => {
  return (
    <div className={clsx(styles.overlay, isOpen && styles.overlayOpen)} onClick={onClose}>
      <div
        className={clsx(styles.content, isOpen && styles.contentOpen)}
        onClick={e => e.stopPropagation()}
      >
        {showCloseBtn && (
          <div className={styles.closeBtn} onClick={onClose}>
            <Cross />
          </div>
        )}
        {title && (
          <h2 className={clsx(styles.title, showCloseBtn && styles.titleLower, titleClassName)}>
            {title}
          </h2>
        )}
        {children}
        <div className={styles.actions}>
          {actions?.map((action, index) => (
            <Button
              key={index}
              className={clsx(styles.btn, action.className)}
              onClick={action.onClick}
              buttonType="primary"
              {...action.props}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
