import { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return <section className='layout'>{children}</section>
}

export const LayoutContainer: FC<PropsWithChildren> = ({ children }) => {
	return <div className='layout-container'>{children}</div>
}
