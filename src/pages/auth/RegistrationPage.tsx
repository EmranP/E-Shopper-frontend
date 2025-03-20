import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authFormWrapperStyles } from '../../app/constants/styles/auth.constants'
import { IRegistrationFormInputs } from '../../features/auth/types/types-ui.interface'
import { AboutAuth } from '../../features/auth/ui/AboutAuth'
import { AuthFormWrapper } from '../../features/auth/ui/AuthFormWrapper'
import { InputAuth } from '../../features/auth/ui/InputAuth'
import { BackMove } from '../../shared/ui/BackMove'
import { Button } from '../../shared/ui/Button'
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

	const onSubmitHandler: SubmitHandler<IRegistrationFormInputs> = data => {
		console.log('Submitted Data:', { ...data })
		reset()
	}

	return (
		<LayoutAuth>
			<AboutAuth />
			<AuthFormWrapper title='Registration Authorization'>
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
						placeholder='Enter your repeat password'
						register={register}
						errors={errors.repeatPassword}
						label='Repeat password'
					/>
					<Button
						title='Sign up'
						bgColor='bg-baseTextAndButton'
						onClick={() => {}}
					/>
				</form>
			</AuthFormWrapper>
			<BackMove color='text-white' />
		</LayoutAuth>
	)
}

export default RegistrationPage
