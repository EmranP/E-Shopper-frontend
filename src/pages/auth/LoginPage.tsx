import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authFormWrapperStyles } from '../../app/constants/styles/auth.constants'
import { ILoginFormInputs } from '../../features/auth/types/types-ui.interface'
import { AboutAuth } from '../../features/auth/ui/AboutAuth'
import { AuthFormWrapper } from '../../features/auth/ui/AuthFormWrapper'
import { InputAuth } from '../../features/auth/ui/InputAuth'
import { useActions } from '../../shared/hooks/useActions'
import { useShowError } from '../../shared/hooks/useShowError'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { BackMove } from '../../shared/ui/BackMove'
import { AuthButton } from '../../shared/ui/Buttons'
import { Title } from '../../shared/ui/Title'
import { authFormLoginSchema } from '../../shared/utils/authFormSchema.utils'
import { LayoutAuth } from '../../widgets/layout/LayoutAuth'

const LoginPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormInputs>({
		resolver: yupResolver(authFormLoginSchema),
	})
	const { login } = useActions()
	const { isAuth, error, isLoading } = useAppSelector(state => state.auth)

	const { showError } = useShowError(error, 5000)

	const onSubmitHandler: SubmitHandler<ILoginFormInputs> = data => {
		login(data.email, data.password)
		reset()
	}

	return (
		<LayoutAuth>
			<AboutAuth />
			<AuthFormWrapper
				title='Login Authorization'
				error={error}
				showError={showError}
			>
				{isAuth ? (
					<Title title='You are already logged in' />
				) : (
					<form
						onSubmit={handleSubmit(onSubmitHandler)}
						className={authFormWrapperStyles}
					>
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
							type='password'
							placeholder='Enter your password'
							register={register}
							errors={errors.password}
							label={'Password'}
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

export default LoginPage
