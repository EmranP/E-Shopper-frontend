import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authFormWrapperStyles } from '../../app/constants/styles/auth.constants'
import { IRegistrationFormInputs } from '../../features/auth/types/types-ui.interface'
import { AboutAuth } from '../../features/auth/ui/AboutAuth'
import { AuthFormWrapper } from '../../features/auth/ui/AuthFormWrapper'
import { InputAuth } from '../../features/auth/ui/InputAuth'
import { useActions } from '../../shared/hooks/useActions'
import { useShowError } from '../../shared/hooks/useShowError'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { BackMove } from '../../shared/ui/BackMove'
import { AuthButton } from '../../shared/ui/Buttons'
import { Title } from '../../shared/ui/Title'
import { authFormRegSchema } from '../../shared/utils/authFormSchema.utils'
import { LayoutAuth } from '../../widgets/layout/LayoutAuth'

const RegistrationPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegistrationFormInputs>({
		resolver: yupResolver(authFormRegSchema),
	})
	const { registration } = useActions()
	const { isAuth, isLoading, error } = useAppSelector(state => state.auth)
	const { showError } = useShowError(error, 5000)

	const onSubmitHandler: SubmitHandler<IRegistrationFormInputs> = data => {
		const { login, email, password } = data
		registration(login, email, password)
		reset()
	}

	return (
		<LayoutAuth>
			<AboutAuth />
			<AuthFormWrapper
				showError={showError}
				error={error}
				title={'Registration Authorization'}
			>
				{isAuth ? (
					<Title title='Please confirm your email account :)' />
				) : (
					<form
						onSubmit={handleSubmit(onSubmitHandler)}
						className={authFormWrapperStyles}
					>
						<InputAuth
							name={'login'}
							type={'text'}
							placeholder='Enter your login'
							register={register}
							errors={errors.login}
							label='Login'
						/>
						<InputAuth
							name={'email'}
							type='email'
							placeholder='Enter your e-mail'
							register={register}
							errors={errors.email}
							label={'E-mail'}
						/>
						<InputAuth
							name={'password'}
							type={'password'}
							placeholder='Enter your password'
							register={register}
							errors={errors.password}
							label='Password'
						/>
						<InputAuth
							name={'repeatPassword'}
							type={'password'}
							placeholder='repeat password'
							register={register}
							errors={errors.repeatPassword}
							label='Repeat password'
						/>
						<AuthButton
							title={isLoading ? 'Loading...' : 'Sign up'}
							bgColor='bg-baseTextAndButton'
							type='submit'
						/>
					</form>
				)}
			</AuthFormWrapper>
			<BackMove color='text-white' />
		</LayoutAuth>
	)
}

export default RegistrationPage
