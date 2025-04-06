import { MoveLeft } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IBackMove } from '../types/ui.interface'

export const BackMove: FC<IBackMove> = ({ color }) => {
	const navigate = useNavigate()
	return (
		<div className='absolute top-5 left-5 '>
			<div
				className={`flex ${color} items-center gap-2 cursor-pointer`}
				onClick={() => navigate('/')}
			>
				<MoveLeft size={30} />
				<h1 className='text-2xl'>Back</h1>
			</div>
		</div>
	)
}
