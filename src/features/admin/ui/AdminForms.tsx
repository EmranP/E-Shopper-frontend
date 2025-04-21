/* eslint-disable react-hooks/exhaustive-deps */
import { Pencil } from 'lucide-react'
import { FC, useState } from 'react'
import { useActions } from '../../../shared/hooks/useActions'
import { useInput } from '../../../shared/hooks/useInput'
import { useMode } from '../../../shared/hooks/useMode'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'
import { DynamicForm } from '../../../shared/ui/DynamicForm'
import { ErrorMessage } from '../../../shared/ui/ErrorUi'
import { Input } from '../../../shared/ui/Input'
import { Label } from '../../../shared/ui/Label'
import { Select } from '../../../shared/ui/Select'
import { TextArea } from '../../../shared/ui/TextArea'
import {
	adminFormConfigOrders,
	adminFormConfigUser,
} from '../../../shared/utils/adminFormConfig.utils'
import { mapCategoriesToOptions } from '../../../shared/utils/mapping.utils'
import { ISelectOption, ISelectOptionUser } from '../types/ui.interface'
import {
	AdminFormActions,
	AdminFormChoiceAction,
	AdminFormFieldEditElement,
} from './AdminFormActionPanel'

//! Notes for redux: gets values data from redux state
//!!! Notes: For Post api products field user_id needs use user.id from redux store
//!!  Notes: Method Create carts when user success register

// * Todo: Orders

export const iconsSize: number = 20

export const AdminFormUsers: FC = () => {
	const [selectedUser, setSelectedUser] = useState<ISelectOptionUser | null>(
		adminFormConfigUser[0]
	)
	const { value, onChange } = useInput(0)
	const { editForAdminUsers } = useActions()
	const { isAppLoading, error } = useAppSelector(state => state.admin.user)

	const onSubmitUsersHandler = () => {
		if (!value || !selectedUser) return

		editForAdminUsers(value, selectedUser.roleId)
	}

	return (
		<DynamicForm>
			<Label htmlFor='id' title='User ID' />
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
			{error && <ErrorMessage error={error} />}
		</DynamicForm>
	)
}

export const AdminFormOrders: FC = () => {
	const [selectedOrders, setSelectedOrders] = useState<ISelectOption | null>(
		adminFormConfigOrders[0]
	)
	const { value, onChange } = useInput(0)
	const { editOrdersForAdmin } = useActions()
	const { isAppLoading, error } = useAppSelector(state => state.admin.orders)

	const onSubmitOrderHandler = () => {
		if (!value || !selectedOrders) return

		editOrdersForAdmin(value, selectedOrders.value as string)
	}

	return (
		<DynamicForm>
			<Label htmlFor='id' title='Order ID' />
			<Input
				type='number'
				placeholder='orderId'
				value={value}
				onChange={onChange}
				required={true}
			/>
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
					onClick={onSubmitOrderHandler}
					title={isAppLoading ? 'Loading...' : 'edit'}
					disabled={isAppLoading}
				>
					<Pencil size={18} />
				</Button>
			</div>
			{error && <ErrorMessage error={error} />}
		</DynamicForm>
	)
}

export const AdminFormProducts: FC = () => {
	const inputProductId = useInput(0)
	const inputProductName = useInput('')
	const inputProductImageUrl = useInput('')
	const inputProductPrice = useInput(0)
	const inputProductStock = useInput(0)
	const [inputProductDescription, setInputProductDescription] = useState('')
	const { mode, changeMode, toggleMode, resetMode } = useMode()
	const { addProduct, editProduct } = useActions()
	const { admin, auth } = useAppSelector(state => state)
	// Destruction
	const { products, categories } = admin
	const { user } = auth
	const { isAppLoading, error } = products
	// Select state
	const categorySelectOptions = mapCategoriesToOptions(categories.categories)
	const [selectedCategories, setSelectedCategories] =
		useState<ISelectOption | null>(
			categorySelectOptions && categorySelectOptions[0]
		)

	const toggleModeHandler = () => toggleMode()
	const resetModes = () => resetMode()

	const modeSubmitHandler = () => {
		if (
			!inputProductName.value ||
			!inputProductPrice.value ||
			!inputProductImageUrl.value ||
			selectedCategories?.value === null ||
			undefined
		) {
			return
		}

		if (mode === 'create') {
			addProduct({
				name: inputProductName.value as string,
				description: inputProductDescription,
				price: inputProductPrice.value as number,
				stock: inputProductStock.value as number,
				category_id: selectedCategories && (selectedCategories.value as number),
				image_url: inputProductImageUrl.value as string,
				userId: user && user.id,
			})
		} else if (mode === 'edit' && inputProductId.value) {
			editProduct({
				id: inputProductId.value as number,
				name: inputProductName.value as string,
				description: inputProductDescription,
				price: inputProductPrice.value as number,
				stock: inputProductStock.value as number,
				category_id: selectedCategories && (selectedCategories.value as number),
				image_url: inputProductImageUrl.value as string,
				userId: user && user.id,
			})
		} else return
	}

	return (
		<DynamicForm>
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
						value={inputProductId.value}
						onChange={inputProductId.onChange}
					/>
					<Label htmlFor='title' title='Product name' />
					<Input
						type='text'
						placeholder='product name'
						value={inputProductName.value}
						onChange={inputProductName.onChange}
						required={true}
					/>
					<Label htmlFor='imageUrl' title='Product image url' />
					<Input
						type='text'
						placeholder='product image url'
						value={inputProductImageUrl.value}
						onChange={inputProductImageUrl.onChange}
						required={true}
					/>
					<Label htmlFor='price' title='Product price' />
					<Input
						type='number'
						placeholder='product price'
						value={inputProductPrice.value}
						onChange={inputProductPrice.onChange}
						required={true}
					/>
					<Label htmlFor='stock' title='Product stock' />
					<Input
						type='number'
						placeholder='product stock'
						value={inputProductStock.value}
						onChange={inputProductStock.onChange}
						required={true}
					/>
					<Label htmlFor='categoryId' title='Product category' />
					<Select
						options={categorySelectOptions && categorySelectOptions}
						selected={selectedCategories}
						setSelected={setSelectedCategories}
					/>
					<TextArea
						label='Product Description'
						value={inputProductDescription}
						setValue={setInputProductDescription}
						maxLength={500}
					/>
					<AdminFormActions
						mode={mode}
						titleAdd='add product'
						titleEdit='edit product'
						toggleModeHandler={toggleModeHandler}
						iconsSize={iconsSize}
						resetModes={resetModes}
						Button={Button}
						isAppLoading={isAppLoading}
						onClick={modeSubmitHandler}
					/>
				</>
			)}
			{error && <ErrorMessage error={error} />}
		</DynamicForm>
	)
}

export const AdminFormCategories: FC = () => {
	const { mode, changeMode, toggleMode, resetMode } = useMode()
	const inputCategoryId = useInput(0)
	const inputCategoryName = useInput('')
	const { addCategory, editCategory } = useActions()
	const { isAppLoading, error } = useAppSelector(
		state => state.admin.categories
	)

	const toggleModeHandler = () => toggleMode()
	const resetModes = () => resetMode()

	const modeSubmitHandler = () => {
		if (
			(mode === 'create' && inputCategoryName.value !== '') ||
			null ||
			undefined
		) {
			addCategory(inputCategoryName.value as string)
		} else if (
			(mode === 'edit' && inputCategoryId.value) ||
			inputCategoryName.value !== '' ||
			null ||
			undefined
		) {
			editCategory(
				inputCategoryId.value as number,
				inputCategoryName.value as string
			)
		}
	}

	return (
		<DynamicForm>
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
						{...inputCategoryId}
					/>
					<Label htmlFor='title' title='Categories name' />
					<Input
						type='text'
						placeholder='Categories name'
						required={true}
						{...inputCategoryName}
					/>
					<AdminFormActions
						mode={mode}
						toggleModeHandler={toggleModeHandler}
						iconsSize={iconsSize}
						resetModes={resetModes}
						titleAdd='add categories'
						titleEdit='edit categories'
						Button={Button}
						isAppLoading={isAppLoading}
						onClick={modeSubmitHandler}
					/>
				</>
			)}
			{error && <ErrorMessage error={error} />}
		</DynamicForm>
	)
}

//! Carts just should be remove element carts

export const AdminFormCarts: FC = () => {
	return (
		<DynamicForm>
			<h1 className='text-center text-white text-2xl'>Carts users</h1>
		</DynamicForm>
	)
}
