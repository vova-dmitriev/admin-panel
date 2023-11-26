import { FC } from 'react'

import styles from './ModalInfo.module.scss'
import { Modal } from '@/components'

interface IModalInfoProps {
  text: string
  visible: boolean
  onClose: () => void
}

export const ModalInfo: FC<IModalInfoProps> = ({ text, visible, onClose }) => {
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      actions={[
        {
          label: 'Закрыть',
          onClick: onClose,
        },
      ]}
      showCloseBtn={false}
    >
      <div className={styles.text}>{text}</div>
    </Modal>
  )
}
