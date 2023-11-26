import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

export interface IButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: () => void
  buttonType?: 'primary' | 'neutral' | 'danger' | 'text'
  className?: string
  type?: 'button' | 'submit'
  count?: number
}

export const Button: FC<IButtonProps> = ({
  children,
  onClick,
  buttonType = 'neutral',
  type = 'button',
  count,
  className,
}) => {
  return (
    <button
      className={clsx(styles.btn, styles[buttonType], className)}
      onClick={onClick}
      type={type}
    >
      {children}
      {count && <div className={styles.count}>{count}</div>}
    </button>
  )
}
