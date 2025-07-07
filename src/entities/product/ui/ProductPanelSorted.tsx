import { FC } from 'react'
import { Button } from '../../../shared/ui/Buttons'
import { IProductPanelSorted } from '../types/types-ui.interface'

export const ProductPanelSorted: FC<IProductPanelSorted> = ({
	productList,
	sortedByPriceDesc,
	setSortedByPriceDesc,
}) => {
	return (
		<div className='flex justify-between gap-5 mb-15'>
			<h1 className='text-2xl flex-auto'>Products</h1>
			{productList.length >= 2 && (
				<Button
					color={'white'}
					bgColor={'bg-bgActionButton'}
					title={sortedByPriceDesc ? 'Reset Sort' : 'Sort by Price ↓'}
					style={{ width: 150 }}
					onClick={() => setSortedByPriceDesc(prev => !prev)}
				/>
			)}
		</div>
	)
}
