import { ICartState } from '@/shared/store/cart/CartCreators.types'

export const selectCart = (state: { cart: ICartState }) => state.cart.cart

export const selectCartTotal = (state: { cart: ICartState }) => {
  const cart = state.cart.cart
  if (!cart) return 0

  return cart.products.reduce((total, product) => {
    return total + product.price * (product.quantity || 1)
  }, 0)
}
