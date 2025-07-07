import * as ProductActionCreators from '../entities/product/model/product.async-actions'
import * as CategoryActionCreators from '../entities/сategory/model/category.async-actions'
import * as AdminActionCreators from '../features/admin/model/admin.async-actions'
import * as AuthActionCreators from '../features/auth/model/index.export'
import * as CartActionCreators from '../features/cart/model/cart.async-action'

export default {
	...AuthActionCreators,
	...AdminActionCreators,
	...ProductActionCreators,
	...CategoryActionCreators,
	...CartActionCreators,
}
