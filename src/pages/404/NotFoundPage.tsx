import { BackMove } from '../../shared/ui/BackMove'

const NotFoundPage = () => {
	return (
		<div className='w-30/60 mx-auto my-40'>
			<h1 className='text-3xl text-center text-semibold'>
				<span className='text-specialCount'>404 </span> Page is not found :(
			</h1>
			<BackMove color='text-baseTextAndButton' />
		</div>
	)
}

export default NotFoundPage
