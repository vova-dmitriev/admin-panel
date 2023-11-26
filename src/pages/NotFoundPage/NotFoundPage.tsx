import { Button } from '@/components'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/routes/constants'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'
import { useAuthStore } from '@/store'

interface INotFoundPageProps {
  text?: string
}

export const NotFoundPage: FC<INotFoundPageProps> = ({ text = 'Страница не найдена' }) => {
  const navigator = useNavigate()
  const { token } = useAuthStore()

  const handleClick = () => {
    const path = token ? PRIVATE_ROUTES.USERS : PUBLIC_ROUTES.HOME
    navigator(path)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.text}>{text}</div>
        <Button onClick={handleClick}>На главную</Button>
      </div>
    </div>
  )
}

export default NotFoundPage
