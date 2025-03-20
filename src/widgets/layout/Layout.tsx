import { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return <div className='layout'>{children}</div>
}

export const LayoutContainer: FC<PropsWithChildren> = ({ children }) => {
	return <div className='layout-container'>{children}</div>
}
