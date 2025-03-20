import { FC, PropsWithChildren } from 'react'

export const LayoutAuth: FC<PropsWithChildren> = ({ children }) => {
	return <div className='h-screen flex items-center h-full'>{children}</div>
}
