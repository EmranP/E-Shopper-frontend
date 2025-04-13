import { FC, PropsWithChildren } from 'react'

export const CartWrapper: FC<PropsWithChildren> = ({ children }) => {
	return <div className='flex gap-20'>{children}</div>
}
