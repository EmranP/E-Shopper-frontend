import { FC, PropsWithChildren } from 'react'

export const LayoutContent: FC<PropsWithChildren> = ({ children }) => {
	return <main>{children}</main>
}
