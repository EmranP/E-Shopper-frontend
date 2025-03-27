import { FC, PropsWithChildren } from 'react'

export const LayoutAdminPanel: FC<PropsWithChildren> = ({ children }) => {
	return <div className='flex flex-wrap gap-30'>{children}</div>
}
