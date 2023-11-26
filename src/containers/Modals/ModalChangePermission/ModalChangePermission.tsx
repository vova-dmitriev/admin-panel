import { FC, useState } from 'react'

import styles from './ModalChangePermission.module.scss'
import { Modal, Select } from '@/components'
import permissions from '@/constants/permissions'
import { IUser } from '@/types'

interface IModalChangePermissionProps {
  visible: boolean
  selectedUser?: IUser
  onClose: () => void
  onSubmit: (permissions: string[]) => void
}

export const ModalChangePermission: FC<IModalChangePermissionProps> = ({
  visible,
  onClose,
  onSubmit,
  selectedUser,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    selectedUser?.permissions || [],
  )

  const handleSubmit = () => {
    onSubmit(selectedPermissions)
    handleClose()
    setSelectedPermissions([])
  }

  const handleClose = () => {
    setSelectedPermissions([])
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
      title="Изменить права доступа"
      onClose={handleClose}
      actions={[
        {
          label: 'Сохранить',
          onClick: () => {
            handleSubmit()
          },
        },
      ]}
      titleClassName={styles.title}
    >
      <div className={styles.content}>
        <div className={styles.select}>
          {visible && (
            <Select
              values={options}
              selectedValues={selectedPermissions}
              onChange={handlePermissionChanges}
              placeholder="Выберите права доступа"
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
