import * as yup from 'yup'

export const authFormLoginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните email')
		.email('Неверный формат email'),
	password: yup
		.string()
		.required('Введите пароль')
		.min(5, 'Пароль должен содержать минимум 5 символов')
		.max(32, 'Пароль не может превышать 32 символа'),
})

export const authFormRegSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только буквы и цифры')
		.min(3, 'Логин должен содержать минимум 3 символа')
		.max(15, 'Логин не может превышать 15 символов'),
	email: yup
		.string()
		.required('Заполните email')
		.email('Неверный формат email')
		.notOneOf([yup.ref('login')], 'Email и логин не должны совпадать'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
			'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру'
		)
		.min(5, 'Пароль должен содержать минимум 5 символов')
		.max(32, 'Пароль не может превышать 32 символа'),
	repeatPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
})
