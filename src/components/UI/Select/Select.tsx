import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Arrow } from '@/assets/icons'
import { DropdownItem } from './DropdownItem'

import styles from './Select.module.scss'

interface ISelectProps {
  values: string[]
  onChange: (values: string[]) => void
  selectedValues?: string[]
  placeholder?: string
  className?: string
  optionToSelectAll?: string
}

export const Select: FC<ISelectProps> = ({
  values,
  onChange,
  selectedValues = [],
  placeholder = 'Выберите',
  className,
  optionToSelectAll = 'Все',
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedValues)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setIsOpen(false)
      setSelectedOptions([])
    }
  }, [])

  const handleToggle = (option: string) => {
    const newItemState = selectedOptions.includes(option)
    if (option.toLowerCase() === optionToSelectAll.toLowerCase()) {
      setSelectedOptions(newItemState ? [] : values)
      return
    }

    const newSelectedOptions = newItemState
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option]
    setSelectedOptions(newSelectedOptions)
  }

  const toggleDropdown = () => {
    const newValue = !isOpen
    setIsOpen(!isOpen)
    if (!newValue) {
      onChange(selectedOptions)
    }
  }

  return (
    <div className={clsx(styles.select, className)}>
      <div className={styles.text} onClick={toggleDropdown}>
        {!selectedOptions.length && <div className={styles.placeholder}>{placeholder}</div>}
        {selectedOptions.length > 0 && (
          <span className={styles.textItem}>
            {selectedOptions.filter(el => el !== optionToSelectAll).join(', ')}
          </span>
        )}
        <div className={clsx(styles.arrow, isOpen && styles.arrowUp)}>
          <Arrow />
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {values.map((option, index) => (
            <DropdownItem
              key={index}
              label={option}
              isChecked={selectedOptions.includes(option)}
              onToggle={() => handleToggle(option)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
