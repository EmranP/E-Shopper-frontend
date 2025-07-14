import * as CategoryActionCreators from '../entities/category/model/category.async-actions'
import * as ProductActionCreators from '../entities/product/model/product.async-actions'
import * as AdminActionCreators from '../features/admin/model/admin.async-actions'
import * as AuthActionCreators from '../features/auth/model/index.export'
import * as CartActionCreators from '../features/cart/model/cart.async-action'
import * as OrderItemsActionCreators from '../features/order/model/order-items.async-action'
import * as OrderActionCreators from '../features/order/model/order.async-action'

export default {
	...AuthActionCreators,
	...AdminActionCreators,
	...ProductActionCreators,
	...CategoryActionCreators,
	...CartActionCreators,
	...OrderActionCreators,
	...OrderItemsActionCreators,
}
