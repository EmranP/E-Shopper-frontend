import { Pencil, Trash } from 'lucide-react'
import { FC, useState } from 'react'
import { useAppSelector } from '../../../shared/hooks/store.hooks'
import { useActions } from '../../../shared/hooks/useActions'
import { useInput } from '../../../shared/hooks/useInput'
import { useMode } from '../../../shared/hooks/useMode'
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
import {
	AdminFormActions,
	AdminFormChoiceAction,
	AdminFormFieldEditElement,
} from './AdminFormActionPanel'

//! Notes for redux: gets values data from redux state
//!!! Notes: For Post api products field user_id needs use user.id from redux store

//*  Notes: Method Create carts when user success register

// !Todo: if button disable is be set opacity
export const iconsSize: number = 20

export const AdminFormUsers: FC = () => {
	const [selectedUser, setSelectedUser] = useState<ISelectOptionUser>(
		adminFormConfigUser[0]
	)
	const { value, onChange } = useInput(0)
	const { editForAdminUsers } = useActions()
	const { isAppLoading, error } = useAppSelector(state => state.admin.user)

	const onSubmitUsersHandler = () => {
		editForAdminUsers(Number(value), selectedUser.roleId)
	}

	return (
		<DynamicForm>
			<Label htmlFor='id' title='ID' />
			<Input
				type='number'
				placeholder='userId'
				required={true}
				value={value}
				onChange={onChange}
			/>
			<Label htmlFor='role' title='Roles' />
			<Select
				options={adminFormConfigUser}
				selected={selectedUser}
				setSelected={setSelectedUser}
			/>
			<div className='w-full mb-5'>
				<Button
					type='button'
					bgColor='bg-baseTextAndButton'
					color='white'
					onClick={onSubmitUsersHandler}
					title={isAppLoading ? 'Loading...' : 'edit'}
					disabled={isAppLoading}
				>
					<Pencil size={iconsSize} />
				</Button>
			</div>
			{error && (
				<h2 className='text-red-500 text-center text-lg font-semibold'>
					{error}
				</h2>
			)}
		</DynamicForm>
	)
}

export const AdminFormOrders: FC = () => {
	const [selectedOrders, setSelectedOrders] = useState(adminFormConfigOrders[0])

	const onSubmitOrderHandler = () => {}
	return (
		<DynamicForm onSubmit={onSubmitOrderHandler}>
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
				>
					<Pencil size={18} />
				</Button>
			</div>
		</DynamicForm>
	)
}

export const AdminFormProducts: FC = () => {
	const [selectedProduct, setSelectedProduct] = useState(
		adminFormConfigOrders[0]
	)
	const { mode, changeMode, toggleMode, resetMode } = useMode()

	const toggleModeHandler = () => toggleMode()
	const resetModes = () => resetMode()

	const onSubmitProductHandler = () => {}
	return (
		<DynamicForm onSubmit={onSubmitProductHandler}>
			<AdminFormChoiceAction
				mode={mode}
				Button={Button}
				changeMode={changeMode}
			/>
			{mode && (
				<>
					<AdminFormFieldEditElement
						mode={mode}
						modeAction={'edit'}
						Label={Label}
						Input={Input}
						titleLabel='Product ID'
						placeholder='product id'
						value=''
					/>
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
					<AdminFormActions
						mode={mode}
						titleAdd='add product'
						titleEdit='edit product'
						toggleModeHandler={toggleModeHandler}
						iconsSize={iconsSize}
						resetModes={resetModes}
						Button={Button}
						onClick={() => {}}
					/>
				</>
			)}
		</DynamicForm>
	)
}

export const AdminFormCategories: FC = () => {
	const { mode, changeMode, toggleMode, resetMode } = useMode()

	const toggleModeHandler = () => toggleMode()
	const resetModes = () => resetMode()

	const onSubmitCategoriesHandler = () => {}
	return (
		<DynamicForm onSubmit={onSubmitCategoriesHandler}>
			<AdminFormChoiceAction
				mode={mode}
				changeMode={changeMode}
				Button={Button}
			/>
			{mode && (
				<>
					<AdminFormFieldEditElement
						mode={mode}
						modeAction={'edit'}
						Label={Label}
						Input={Input}
						titleLabel='Categories ID'
						placeholder='categories id'
						value=''
					/>
					<Label htmlFor='title' title='Categories name' />
					<Input
						type='text'
						placeholder='Categories name'
						value={''}
						required={true}
					/>
					<AdminFormActions
						mode={mode}
						toggleModeHandler={toggleModeHandler}
						iconsSize={iconsSize}
						resetModes={resetModes}
						titleAdd='add categories'
						titleEdit='edit categories'
						Button={Button}
						onClick={() => {}}
					/>
				</>
			)}
		</DynamicForm>
	)
}

//! Carts just should be remove element carts

export const AdminFormCarts: FC = () => {
	const onSubmitCartsHandler = () => {}
	return (
		<DynamicForm onSubmit={onSubmitCartsHandler}>
			<Label htmlFor='id' title='Cart ID' />
			<Input type='number' placeholder='cart id' value={''} required={true} />
			<Button
				type='button'
				bgColor='bg-baseTextAndButton'
				color='white'
				onClick={() => {}}
				title='remove cart'
			>
				<Trash size={iconsSize} />
			</Button>
		</DynamicForm>
	)
}
