import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ICartProduct,
  initialState,
} from '@/shared/store/cart/CartCreators.types'

export const CartCreators = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<ICartProduct, 'quantity'>>,
    ) => {
      const newItem = {
        ...action.payload,
        quantity: 1,
      }

      if (!state.cart) {
        state.cart = {
          id: Date.now(),
          userId: 1,
          products: [newItem],
        }

        return
      }

      const existingProductIndex = state.cart.products.findIndex(
        product => product.id === action.payload.id,
      )

      if (existingProductIndex >= 0) {
        state.cart.products[existingProductIndex].quantity =
          (state.cart.products[existingProductIndex].quantity || 1) + 1
      } else {
        state.cart.products.push(newItem)
      }
    },
    removeProductCart: (state, action: PayloadAction<{ id: number }>) => {
      if (state.cart) {
        state.cart.products = state.cart.products.filter(
          product => product.id !== action.payload.id,
        )
      }
    },
    deleteCart: state => {
      state.cart = undefined
    },
  },
})

export const { addToCart, removeProductCart, deleteCart } = CartCreators.actions
