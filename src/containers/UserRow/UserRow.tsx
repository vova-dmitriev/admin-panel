import React, { FC } from 'react'
import { IUser } from '@/types'

import styles from './UserRow.module.scss'
import { More, User } from '@/assets/icons'
import clsx from 'clsx'
import { checkIsBoss } from '@/utils/permissions'
import { IPopoverItem, Popover } from '@/components/UI'

interface IUserRowProps {
  user: IUser
  actionItems: IPopoverItem[]
  isPopoverVisible: boolean
  onActionClick: () => void
}

export const UserRow: FC<IUserRowProps> = ({
  user,
  actionItems,
  isPopoverVisible,
  onActionClick,
}) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onActionClick()
  }

  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          {user.image ? <img src={user?.image} alt={user?.email} /> : <User />}
        </div>

        <div className={styles.info}>
          <div className={styles.infoTitle}>
            <div className={styles.name}>{user.name}</div>
            {user.isAuthorized === false && <div className={styles.auth}>Не авторизирован</div>}
            <div className={styles.email}>{user?.email}</div>
          </div>
          <div className={styles.tags}>
            {user.permissions.map(permission => (
              <div
                key={permission}
                className={clsx(styles.tag, checkIsBoss(user) && styles.tagBoss)}
              >
                {permission}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.action} onClick={handleActionClick}>
        <More />
        {isPopoverVisible && <Popover items={actionItems} />}
      </div>
    </div>
  )
}
