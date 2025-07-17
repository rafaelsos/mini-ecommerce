import { ICartState } from '@/shared/store/cart/CartCreators.types'

export const selectCart = (state: { cart: ICartState }) => state.cart.cart
