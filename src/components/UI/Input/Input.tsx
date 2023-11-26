import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'
import Cross from '@/assets/icons/cross'
import Search from '@/assets/icons/search'

type IInputProps = {
  ref?: Ref<HTMLInputElement>
  tagType?: string
  className?: string
  focusClassName?: string
  fieldClassName?: string
  label?: string | ReactNode
  value?: string
  defaultValue?: string
  handler: (value: string) => void
  clearable?: boolean
  search?: boolean
  searchHandler?: (value: string) => void

  error?: string
} & HTMLAttributes<HTMLInputElement>

export const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      className,
      error,
      clearable,
      placeholder,
      tagType,
      handler,
      value,
      search,
      searchHandler,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId()
    const [showSearchIcon, setShowSearchIcon] = useState(search && !value?.length)
    const [showClearIcon, setShowClearIcon] = useState(clearable && !!value?.length)

    useEffect(() => {
      if (value?.length) {
        setShowSearchIcon(false)
        setShowClearIcon(clearable)
      } else {
        setShowClearIcon(false)
        setShowSearchIcon(search)
      }
    }, [value, clearable, search])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowClearIcon(clearable && !!e.target.value?.length)
      setShowSearchIcon(search && !e.target.value?.length)
      handler(e.target.value)
    }

    const handleSearch = () => {
      searchHandler && searchHandler(value || '')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        searchHandler && searchHandler(value || '')
      }
    }

    const handleClear = () => {
      handler('')
    }

    return (
      <div className={clsx(styles.wrapper, className)} onKeyDown={handleKeyDown}>
        {label && <Label htmlFor={`input-${uniqueId}`}>{label}</Label>}
        <div className={styles.group}>
          <input
            id={`input-${uniqueId}`}
            ref={ref}
            placeholder={placeholder}
            type={tagType}
            className={clsx(styles.input, error && styles.inputError)}
            onChange={handleChange}
            value={value}
            {...props}
          />
          {showSearchIcon && (
            <div className={styles.search} onClick={handleSearch}>
              <Search />
            </div>
          )}
          {showClearIcon && (
            <div className={styles.clear} onClick={handleClear}>
              <Cross />
            </div>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export const Label: FC<{
  htmlFor?: string
  className?: string
  children: React.ReactNode | string
}> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, className)}>
      {children}
    </label>
  )
}
