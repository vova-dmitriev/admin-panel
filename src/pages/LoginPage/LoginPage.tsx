import React, { FC, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { PRIVATE_ROUTES } from '@/routes/constants'

import styles from './LoginPage.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '@/components'

interface ILoginPageProps {}

type FormData = {
  email: string
  password: string
}

export const LoginPage: FC<ILoginPageProps> = () => {
  const { control, clearErrors, trigger, getValues, setError } = useForm<FormData>()
  const nav = useNavigate()
  const { token, user, error, login, clearError } = useAuthStore()

  useEffect(() => {
    if (token && user) {
      nav(PRIVATE_ROUTES.USERS)
    }
  }, [token, user, nav])

  useEffect(() => {
    if (error) {
      setError('email', { message: error })
      clearError()
    }
  }, [error, clearError, setError])

  const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const isValid = await trigger()
    if (!isValid) return
    const values = getValues()
    login(values.email, values.password)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Вход</div>
      <form onSubmit={handleLogin} className={styles.form}>
        <Controller
          control={control}
          name={'email'}
          rules={{
            required: {
              value: true,
              message: 'Необходимо указать e-mail',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="E-mail"
              error={error?.message}
              handler={(value: string) => {
                clearErrors('email')
                onChange(value)
              }}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={'password'}
          rules={{
            required: {
              value: true,
              message: 'Необходимо указать пароль',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Пароль"
              tagType="password"
              error={error?.message || ''}
              handler={(value: string) => {
                clearErrors('password')
                onChange(value)
              }}
              value={value}
            />
          )}
        />

        <Button buttonType="primary" type="submit" className={styles.btn}>
          Войти
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
