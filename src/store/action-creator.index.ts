import * as AdminActionCreators from '../features/admin/model/admin.async-actions'
import * as AuthActionCreators from '../features/auth/model/index.export'

export default {
	...AuthActionCreators,
	...AdminActionCreators,
}
