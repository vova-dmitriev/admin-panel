import { FC } from 'react'

import styles from './ModelDelete.module.scss'
import { Modal } from '@/components'

interface IModalDeleteProps {
  text: string
  visible: boolean
  onClose: () => void
  onSubmit: () => void
}

export const ModalDelete: FC<IModalDeleteProps> = ({ text, visible, onClose, onSubmit }) => {
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      actions={[
        {
          label: 'Удалить',
          onClick: onSubmit,
          props: { buttonType: 'danger' },
        },
        {
          label: 'Закрыть',
          onClick: onClose,
        },
      ]}
    >
      <div className={styles.text}>{text}</div>
    </Modal>
  )
}
