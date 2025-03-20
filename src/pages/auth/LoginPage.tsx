import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authFormWrapperStyles } from '../../app/constants/styles/auth.constants'
import { ILoginFormInputs } from '../../features/auth/types/types-ui.interface'
import { AboutAuth } from '../../features/auth/ui/AboutAuth'
import { AuthFormWrapper } from '../../features/auth/ui/AuthFormWrapper'
import { InputAuth } from '../../features/auth/ui/InputAuth'
import { BackMove } from '../../shared/ui/BackMove'
import { Button } from '../../shared/ui/Button'
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

	const onSubmitHandler: SubmitHandler<ILoginFormInputs> = data => {
		console.log('Submitted Data:', { ...data })
		reset()
	}
	return (
		<LayoutAuth>
			<AboutAuth />
			<AuthFormWrapper title='Login Authorization'>
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
					<Button
						title='Sign in'
						bgColor='bg-baseTextAndButton'
						onClick={() => {}}
					/>
				</form>
			</AuthFormWrapper>
			<BackMove color='text-white' />
		</LayoutAuth>
	)
}

export default LoginPage
