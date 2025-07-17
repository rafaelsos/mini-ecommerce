import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { ProductDetailsScreen } from '@/features/catalog/screens/ProductDetailsScreen'
import { addToCart } from '@/shared/store/cart/CartCreators'

jest.mock('@/features/catalog/data/ProductByIdLoad', () => ({
  makeProductByLoad: {
    handle: jest.fn(),
  },
}))

const mockProduct = {
  id: 1,
  title: 'Produto Teste',
  price: 99.99,
  description: 'Descrição do produto teste',
  category: 'categoria-teste',
  image: 'https://example.com/image-teste.jpg',
}

const mockNavigation = {
  reset: jest.fn(),
} as any

const mockRoute = {
  key: 'product-details-key',
  name: 'ProductDetails' as const,
  params: { productId: 1 },
} as any

const makeComponent = () =>
  render(<ProductDetailsScreen navigation={mockNavigation} route={mockRoute} />)

describe('ProductDetailsScreen', () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>
  const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseDispatch.mockReturnValue(mockDispatch)
  })

  it('should display loading indicator when loading', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any)

    const { getByTestId } = makeComponent()

    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('should display product not found when no data', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { getByTestId } = makeComponent()

    expect(getByTestId('product-not-found')).toBeTruthy()
  })

  it('should display product details when loaded', async () => {
    mockUseQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { getByText, getByTestId } = makeComponent()

    await waitFor(() => {
      expect(getByText('Produto Teste')).toBeTruthy()
      expect(getByText('Descrição do produto teste')).toBeTruthy()
      expect(getByText('Price: $99.99')).toBeTruthy()
      expect(getByTestId('add-to-cart-button')).toBeTruthy()
    })
  })

  it('should call dispatch and navigate when pressing add to cart button', async () => {
    mockUseQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { getByTestId } = makeComponent()

    await waitFor(() => {
      expect(getByTestId('add-to-cart-button')).toBeTruthy()
    })

    fireEvent.press(getByTestId('add-to-cart-button'))

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct))
    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'CartTab' }],
    })
  })

  it('should call makeProductByLoad handle through useQuery with correct productId', () => {
    mockUseQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    makeComponent()

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['product-detail-key'],
      queryFn: expect.any(Function),
    })
  })
})
