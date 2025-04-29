/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { ISelectOption } from '../../../features/admin/types/ui.interface'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Select } from '../../../shared/ui/Select'
import { mapCategoriesToOptions } from '../../../shared/utils/mapping.utils'

export const CategoryLayout: FC = () => {
	const { categories } = useAppSelector(state => state.admin.categories)
	const categorySelectOptions = mapCategoriesToOptions(categories)
	const [selectedCategories, setSelectedCategories] =
		useState<ISelectOption | null>(null)

	const { getAllCategories } = useActions()

	useEffect(() => {
		getAllCategories()
	}, [])

	return (
		<div className='bg-bgCategory w-[300px] h-[450px] p-5 rounded text-base'>
			<h1 className='text-3xl mb-5'>Category {selectedCategories?.label}</h1>
			{!selectedCategories?.label && <p className='mb-5'>Select category :)</p>}
			<Select
				options={categorySelectOptions && categorySelectOptions}
				selected={selectedCategories}
				setSelected={setSelectedCategories}
			/>
		</div>
	)
}
