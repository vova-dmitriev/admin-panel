export enum ERROR_TYPES {
	user_not_found = 'user_not_found',
	user_already_exists = 'user_already_exists',
	invalid_password = 'invalid_password',
}

export const ERROR_TEXT: Record<keyof typeof ERROR_TYPES, string> = {
	user_not_found: 'Данный e-mail не был найден',
	user_already_exists: 'Данный e-mail уже зарегистрирован',

  invalid_password: 'Неправильно указан логин или пароль',
}