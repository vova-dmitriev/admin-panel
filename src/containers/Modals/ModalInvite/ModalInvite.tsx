import { FC, useState } from 'react'

import styles from './ModalInvite.module.scss'
import { Input, Modal, Select } from '@/components'
import { isValidEmail } from '@/utils/validation'
import permissions from '@/constants/permissions'

interface IModalInviteProps {
  visible: boolean
  onClose: () => void
  handleSubmitInvite: (data: { email: string; permissions: string[] }) => void
}

export const ModalInvite: FC<IModalInviteProps> = ({ visible, onClose, handleSubmitInvite }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setEmailError('Неправильно указан email')
      return
    }
    if (!email.length || !selectedPermissions.length) return
    setEmailError('')

    handleSubmitInvite({ email, permissions: selectedPermissions })
    handleClose()
    setSelectedPermissions([])
  }

  const handleClose = () => {
    setEmail('')
    setSelectedPermissions([])
    setEmailError('')
    onClose()
  }

  const handlePermissionChanges = (values: string[]) => {
    setSelectedPermissions(values)
  }

  const options = [
    'Все',
    permissions.MODERATOR,
    permissions.BLOG,
    permissions.TECH_SUPPORT,
    permissions.CUSTOMERS,
    permissions.ANALYST,
    permissions.STOCK,
  ]

  return (
    <Modal
      isOpen={visible}
      title="Отправьте приглашение"
      onClose={handleClose}
      actions={[
        {
          label: 'Отправить приглашение',
          onClick: () => {
            handleSubmit()
          },
        },
      ]}
      titleClassName={styles.title}
    >
      <div className={styles.content}>
        {visible && (
          <>
            <Input
              placeholder="Email"
              handler={value => setEmail(value)}
              className={styles.input}
              error={emailError}
              value={email}
            />
            <div className={styles.select}>
              <Select
                values={options}
                onChange={handlePermissionChanges}
                placeholder="Выберите права доступа"
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
