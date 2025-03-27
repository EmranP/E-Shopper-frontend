import { FC, PropsWithChildren, Suspense } from 'react'
import { Loader } from './Loader'

export const WrapperSuspense: FC<PropsWithChildren> = ({ children }) => {
	return <Suspense fallback={<Loader />}>{children}</Suspense>
}
