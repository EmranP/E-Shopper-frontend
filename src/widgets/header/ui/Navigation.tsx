import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { navigationLink } from '../../../shared/utils/navigationData.utils'

export const Navigation: FC = () => {
	const { user } = useAppSelector(state => state.auth)

	return (
		<nav className='text-xl'>
			{user?.id ? (
				<ul className='flex gap-2'>
					{navigationLink
						.filter(navLinkFiltered =>
							navLinkFiltered.isRoles.includes(user.role)
						)
						.map(navLink => (
							<NavLink
								key={navLink.id}
								className={({ isActive }) =>
									isActive
										? 'nav-link__active'
										: 'font-normal py-1 px-4 hover:bg-[#F4F4F5] rounded-lg transition-colors duration-300 ease-in-out'
								}
								to={navLink.path}
							>
								<li>{navLink.title}</li>
							</NavLink>
						))}
				</ul>
			) : (
				<h1>The menu is available only to authorized users</h1>
			)}
		</nav>
	)
}
