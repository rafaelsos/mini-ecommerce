export interface ICart {
  id: number
  userId: number
  products: ICartProduct[]
}

export interface ICartProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  quantity: number
}

export interface ICartState {
  cart?: ICart
}

export const initialState: ICartState = {
  cart: undefined,
}
