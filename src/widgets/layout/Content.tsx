import { FC, PropsWithChildren } from 'react'
import { LayoutContainer } from './Layout'

export const LayoutContent: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className='flex-auto py-10'>
			<LayoutContainer>{children}</LayoutContainer>
		</main>
	)
}
