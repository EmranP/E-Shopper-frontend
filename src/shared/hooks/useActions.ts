import { bindActionCreators } from 'redux'
import ActionsCreators from '../../store/action-creator.index'
import { useAppDispatch } from './useStoreApp.hooks'

export const useActions = () => {
	const dispatch = useAppDispatch()
	return bindActionCreators(ActionsCreators, dispatch)
}
