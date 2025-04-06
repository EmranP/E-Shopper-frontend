import { CirclePlus, Pencil } from 'lucide-react'
import { FC } from 'react'
import {
	IAdminFormActions,
	IAdminFormChoiceAction,
	IAdminFormFieldIDElement,
} from '../types/ui.interface'

export const AdminFormChoiceAction: FC<IAdminFormChoiceAction> = ({
	mode,
	Button,
	changeMode,
}) => {
	return (
		<>
			{!mode && (
				<div className='h-full flex justify-between items-center gap-4 '>
					<Button
						type='button'
						bgColor='bg-baseTextAndButton'
						color='white'
						onClick={() => changeMode('create')}
						title='Add mode'
					/>
					<Button
						type='button'
						bgColor='bg-baseTextAndButton'
						color='white'
						onClick={() => changeMode('edit')}
						title='Edit mode'
					/>
				</div>
			)}
		</>
	)
}

export const AdminFormFieldEditElement: FC<IAdminFormFieldIDElement> = ({
	mode,
	modeAction,
	Label,
	Input,
	titleLabel,
	placeholder,
	value,
}) => {
	return (
		<>
			{mode === modeAction && (
				<>
					<Label htmlFor='id' title={titleLabel} />
					<Input
						type='number'
						placeholder={placeholder}
						value={value}
						required={true}
					/>
				</>
			)}
		</>
	)
}

export const AdminFormActions: FC<IAdminFormActions> = ({
	mode,
	toggleModeHandler,
	iconsSize,
	resetModes,
	titleAdd,
	titleEdit,
	onClick,
	Button,
}) => {
	return (
		<>
			<div className='flex items-center gap-4 my-4'>
				<Button
					type='button'
					bgColor='bg-baseTextAndButton'
					color='white'
					onClick={toggleModeHandler}
					title='change mode'
				/>
				<Button
					type='button'
					bgColor='bg-baseTextAndButton'
					color='white'
					onClick={onClick}
					title={mode === 'create' ? titleAdd : titleEdit}
				>
					{mode === 'create' ? (
						<CirclePlus size={iconsSize} />
					) : (
						<Pencil size={iconsSize} />
					)}
				</Button>
			</div>
			<Button
				type='button'
				bgColor='bg-baseTextAndButton'
				color='white'
				onClick={resetModes}
				title={'Cancel'}
			/>
		</>
	)
}
