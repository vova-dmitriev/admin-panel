import { FC, useEffect, useState } from 'react'
import { useAppStore, useAuthStore, useUsersStore } from '@/store'
import { IUser, RequestStatus } from '@/types'
import { Button, Input, Loader } from '@/components'
import { UserRow } from '@/containers'
import { Burger, Search } from '@/assets/icons'
import { IPopoverItem } from '@/components/UI/Popover/Popover'
import { checkIsBoss } from '@/utils/permissions'
import { ModalChangePermission, ModalDelete, ModalInfo, ModalInvite } from '@/containers/Modals'

import styles from './UsersPage.module.scss'
import useCheckMobileScreen from '@/hooks/useCheckMobileScreen'

export const UsersPage: FC = () => {
  const {
    getUsers,
    statuses,
    users,
    isLoading,
    sendInvite,
    removeUser,
    resetStatuses,
    changeUserPermissions,
  } = useUsersStore()
  const { user: currentUser } = useAuthStore()
  const { changeSidebarVisible, isSidebarVisible } = useAppStore()
  const isMobile = useCheckMobileScreen()
  const [isInputVisible, setInputVisible] = useState(isMobile)
  const [usersList, setUsersList] = useState(users)
  const [popoverRowsVisible, setPopoverRowsVisible] = useState<Record<string, boolean>>({})

  const [isModalInviteOpen, setModalInviteOpen] = useState(false)
  const [isModalChangePermissionOpen, setModalChangePermissionOpen] = useState(false)
  const [isModalSuccessOpen, setModalSuccessOpen] = useState(false)
  const [modalSubmitText, setModalSubmitText] = useState('')
  const [emailValue, setEmailValue] = useState('')

  const [inviteData, setInviteData] = useState<{ email: string; permissions: string[] } | null>()

  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const isAdmin = currentUser && checkIsBoss(currentUser)

  useEffect(() => {
    resetStatuses()
  }, [resetStatuses])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    setUsersList(users)
  }, [users])

  useEffect(() => {
    setInputVisible(isMobile)
  }, [isMobile])

  useEffect(() => {
    if (statuses.sendInvite === RequestStatus.success) {
      setModalSubmitText(
        `Приглашение отправлено на почту ${inviteData?.email || selectedUser?.email}`,
      )
      setModalSuccessOpen(true)
      resetStatuses()
    }
    if (statuses.removeUser === RequestStatus.success) {
      setModalSubmitText('Пользователь успешно удален ')
      setModalSuccessOpen(true)
      resetStatuses()
    }
    if (statuses.changeUserPermissions === RequestStatus.success) {
      setModalSubmitText('Изменены права доступа')
      setModalSuccessOpen(true)
      resetStatuses()
    }
  }, [statuses, resetStatuses, inviteData, selectedUser])

  const handleSearchUser = (value: string) => {
    setEmailValue(value)
    if (!value) {
      setUsersList(users)
      return
    }
    const newUsers = users.filter(u => u.email.toLowerCase().includes(value.toLowerCase()))
    setUsersList(newUsers)
  }

  const handleInviteUser = () => {
    setModalInviteOpen(true)
  }

  const handleChangePermissions = (user: IUser) => {
    setSelectedUser(user)
    setModalChangePermissionOpen(true)
  }

  const handleSendCodeAgain = (user: IUser) => {
    setSelectedUser(user)
    sendInvite({ email: user.email, permissions: user.permissions, needAddUser: false })
  }

  const handleDeleteUser = (user: IUser) => {
    setSelectedUser(user)
    setModalDeleteOpen(true)
  }

  const handleSubmitDeleteUser = () => {
    selectedUser && removeUser(selectedUser)
    setModalDeleteOpen(false)
  }

  const handleChangePopoverVisible = (user: IUser) => {
    setPopoverRowsVisible({
      [user.email]: !popoverRowsVisible[user.email],
    })
  }

  const handleSubmitInvite = (data: { email: string; permissions: string[] }) => {
    setInviteData(data)
    sendInvite({ email: data.email, permissions: data.permissions, needAddUser: true })
  }

  const handleSubmitChangePermission = (permissions: string[]) => {
    selectedUser && changeUserPermissions(selectedUser, permissions)
    setModalChangePermissionOpen(false)
  }

  const closePopovers = () => {
    setPopoverRowsVisible({})
  }

  const formActionItems = (user: IUser): IPopoverItem[] => {
    return [
      {
        text: 'Изменить права доступа',
        disabled: !isAdmin,
        handler: () => {
          handleChangePermissions(user)
          closePopovers()
        },
      },
      {
        text: 'Отправить код повторно',
        disabled: !isAdmin,
        handler: () => {
          handleSendCodeAgain(user)
          closePopovers()
        },
        visible: user.isAuthorized === false,
      },
      {
        text: 'Удалить',
        disabled: !isAdmin,
        handler: () => {
          handleDeleteUser(user)
          closePopovers()
        },
      },
    ]
  }

  return (
    <div className={styles.wrapper} onClick={closePopovers}>
      <Loader visible={statuses.getUsers === RequestStatus.loading} />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {isMobile && (
              <div
                className={styles.burger}
                onClick={() => changeSidebarVisible(!isSidebarVisible)}
              >
                <Burger />
              </div>
            )}
            <div className={styles.title}>Команда</div>
          </div>
          <div className={styles.headerRight}>
            {isInputVisible ? (
              <Input
                search
                handler={handleSearchUser}
                placeholder="Поиск по Email"
                className={styles.input}
                value={emailValue}
                clearable
              />
            ) : (
              <div className={styles.inputIcon} onClick={() => setInputVisible(true)}>
                <Search />
              </div>
            )}

            <Button
              buttonType="primary"
              type="submit"
              className={styles.btn}
              onClick={handleInviteUser}
            >
              Добавить пользователя
            </Button>
          </div>
        </div>
        <div className={styles.command}>
          {!usersList.length && !isLoading && <div className={styles.empty}>Здесь пусто...</div>}
          {usersList.map(user => (
            <UserRow
              key={user.email}
              user={user}
              actionItems={formActionItems(user)}
              isPopoverVisible={!!popoverRowsVisible[user.email]}
              onActionClick={() => handleChangePopoverVisible(user)}
            />
          ))}
        </div>
      </div>
      <ModalInvite
        visible={isModalInviteOpen}
        onClose={() => setModalInviteOpen(false)}
        handleSubmitInvite={handleSubmitInvite}
      />
      <ModalChangePermission
        visible={isModalChangePermissionOpen}
        onClose={() => setModalChangePermissionOpen(false)}
        onSubmit={handleSubmitChangePermission}
        selectedUser={selectedUser!}
      />
      <ModalInfo
        visible={isModalSuccessOpen}
        onClose={() => setModalSuccessOpen(false)}
        text={modalSubmitText}
      />
      <ModalDelete
        visible={isModalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onSubmit={handleSubmitDeleteUser}
        text={`Вы действительно хотите удалить пользователя ${selectedUser?.name}?`}
      />
    </div>
  )
}

export default UsersPage
