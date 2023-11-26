import { FC } from 'react'
import { Check } from '@/assets/icons'

import styles from './Select.module.scss'

interface IDropdownItemProps {
  label: string
  isChecked: boolean
  onToggle: () => void
}

export const DropdownItem: FC<IDropdownItemProps> = ({ label, isChecked, onToggle }) => {
  return (
    <div className={styles.dropdownItem} onClick={onToggle}>
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <div className={styles.checkbox}>{isChecked && <Check />}</div>
      <div>{label}</div>
    </div>
  )
}
