import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { navigationLink } from '../../../shared/utils/navigationData.utils'

export const Navigation: FC = () => {
	return (
		<nav className='text-xl'>
			<ul className='flex gap-2'>
				{navigationLink.map(navLink => (
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
		</nav>
	)
}
