import { FC, useState } from 'react'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Button } from '../../../shared/ui/Buttons'
import { DynamicForm } from '../../../shared/ui/DynamicForm'
import { Input } from '../../../shared/ui/Input'
import { Label } from '../../../shared/ui/Label'
import { Select } from '../../../shared/ui/Select'
import { TextArea } from '../../../shared/ui/TextArea'
import {
	adminFormConfigOrders,
	adminFormConfigUser,
} from '../../../shared/utils/adminFormConfig.utils'
import { ISelectOptionUser } from '../types/ui.interface'

//! Notes for redux: gets values data from redux state
//!!! Notes: For Post api products field user_id needs use user.id from redux store

export const AdminFormUsers: FC = () => {
	const [selectedUser, setSelectedUser] = useState<ISelectOptionUser>(
		adminFormConfigUser[0]
	)

	return (
		<DynamicForm>
			<Label htmlFor='id' title='ID' />
			<Input type='number' placeholder='userId' value={''} required={true} />
			<Label htmlFor='role' title='Roles' />
			{/* For created api: if selectedUser === 'Admin' ? ROLES.ADMIN : ROLES.USER  */}
			<Select
				options={adminFormConfigUser}
				selected={selectedUser}
				setSelected={setSelectedUser}
			/>
			<div className='w-full'>
				<Button
					type='button'
					bgColor='bg-baseTextAndButton'
					color='white'
					onClick={() => {}}
					title='edit'
				/>
			</div>
		</DynamicForm>
	)
}

export const AdminFormOrders: FC = () => {
	const [selectedOrders, setSelectedOrders] = useState(adminFormConfigOrders[0])

	return (
		<DynamicForm>
			<Label htmlFor='id' title='Order ID' />
			<Input type='number' placeholder='orderId' value={''} required={true} />
			<Label htmlFor='status' title='Status' />
			<Select
				options={adminFormConfigOrders}
				selected={selectedOrders}
				setSelected={setSelectedOrders}
			/>
			<div className='w-full'>
				<Button
					type='button'
					bgColor='bg-baseTextAndButton'
					color='white'
					onClick={() => {}}
					title='edit'
				/>
			</div>
		</DynamicForm>
	)
}

export const AdminFormProducts: FC = () => {
	const [selectedProduct, setSelectedProduct] = useState(
		adminFormConfigOrders[0]
	)
	const { toggle, toggleHandler } = useToggle(false)
	const [isModeEdited, setIsModeEdited] = useState(false)
	const [isModeCreated, setIsModeCreated] = useState(false)

	const choseModeEditedHandler = () => setIsModeEdited(true)
	const choseModeCreatedHandler = () => setIsModeCreated(true)
	const resetModes = () => {
		setIsModeCreated(false)
		setIsModeEdited(false)
	}

	// const toggleEditModeHandler = () => {
	// 	if (isModeEdited) toggleHandler()
	// }

	return (
		<DynamicForm>
			{!isModeCreated && !isModeEdited && (
				<div className='flex justify-between items-center gap-4'>
					<Button
						type='button'
						bgColor='bg-baseTextAndButton'
						color='white'
						onClick={choseModeCreatedHandler}
						title='add mode'
					/>
					<Button
						type='button'
						bgColor='bg-baseTextAndButton'
						color='white'
						onClick={choseModeEditedHandler}
						title='edit mode'
					/>
				</div>
			)}

			{(isModeEdited || isModeCreated) && (
				<>
					{isModeEdited && toggle && (
						<>
							<Label htmlFor='id' title='Product ID' />
							<Input
								type='number'
								placeholder='product id'
								value={''}
								required={true}
							/>
						</>
					)}
					<Label htmlFor='title' title='Product name' />
					<Input
						type='text'
						placeholder='product name'
						value={''}
						required={true}
					/>
					<Label htmlFor='imageUrl' title='Product image url' />
					<Input
						type='text'
						placeholder='product image url'
						value={''}
						required={true}
					/>
					<Label htmlFor='price' title='Product price' />
					<Input
						type='number'
						placeholder='product price'
						value={''}
						required={true}
					/>
					<Label htmlFor='stock' title='Product stock' />
					<Input
						type='number'
						placeholder='product stock'
						value={''}
						required={true}
					/>
					<Label htmlFor='categoryId' title='Product category ID' />
					<Select
						options={adminFormConfigOrders} // Here need get state from redux store
						selected={selectedProduct}
						setSelected={setSelectedProduct}
					/>
					<TextArea
						label='Product Description'
						value={''}
						setValue={() => {}}
						maxLength={200}
					/>
					<div className='flex items-center gap-4 my-4'>
						{isModeEdited && (
							<Button
								type='button'
								bgColor='bg-baseTextAndButton'
								color='white'
								onClick={toggleHandler}
								title='change mode'
							/>
						)}
						<Button
							type='button'
							bgColor='bg-baseTextAndButton'
							color='white'
							onClick={() => {}}
							title={!toggle ? 'add product' : 'edit product'}
						/>
					</div>
					<Button
						type='button'
						bgColor='bg-baseTextAndButton'
						color='white'
						onClick={resetModes}
						title={'Cancel'}
					/>
				</>
			)}
		</DynamicForm>
	)
}

export const AdminFormCategories: FC = () => {
	return (
		<DynamicForm>
			<label htmlFor=''></label>
		</DynamicForm>
	)
}
