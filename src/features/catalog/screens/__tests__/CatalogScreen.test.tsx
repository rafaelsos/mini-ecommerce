import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useQuery } from '@tanstack/react-query'

import { CatalogScreen } from '@/features/catalog/screens/CatalogScreen'

jest.mock('@/features/catalog/data/CatalogLoad', () => ({
  makeCatalogLoad: {
    handle: jest.fn(),
  },
}))

const mockProducts = [
  {
    id: 1,
    title: 'Produto 1',
    price: 29.99,
    description: 'Descrição do produto 1',
    category: 'categoria1',
    image: 'https://example.com/image1.jpg',
  },
  {
    id: 2,
    title: 'Produto 2',
    price: 49.99,
    description: 'Descrição do produto 2',
    category: 'categoria2',
    image: 'https://example.com/image2.jpg',
  },
]

const mockNavigation = {
  navigate: jest.fn(),
} as any

const mockRoute = {
  key: 'catalog-key',
  name: 'Catalog' as const,
  params: undefined,
} as any

const makeComponent = () =>
  render(<CatalogScreen navigation={mockNavigation} route={mockRoute} />)

describe('CatalogScreen', () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

  beforeEach(() => {
    jest.clearAllMocks()
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

  it('should display product list when loaded', async () => {
    mockUseQuery.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { getByTestId, getByText } = makeComponent()

    await waitFor(() => {
      expect(getByTestId('product-item-1')).toBeTruthy()
      expect(getByTestId('product-item-2')).toBeTruthy()
    })

    expect(getByText('Produto 1')).toBeTruthy()
    expect(getByText('$29.99')).toBeTruthy()
    expect(getByText('Produto 2')).toBeTruthy()
    expect(getByText('$49.99')).toBeTruthy()
  })

  it('should navigate to ProductDetails when pressing a product', async () => {
    mockUseQuery.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { getByTestId } = makeComponent()

    await waitFor(() => {
      expect(getByTestId('product-item-1')).toBeTruthy()
    })

    fireEvent.press(getByTestId('product-item-1'))

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetails', {
      productId: 1,
    })
  })

  it('should display empty list when there are no products', async () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { queryByTestId } = makeComponent()

    await waitFor(() => {
      expect(queryByTestId('product-item-1')).toBeNull()
      expect(queryByTestId('product-item-2')).toBeNull()
    })
  })

  it('should call makeCatalogLoad handle through useQuery', () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    makeComponent()

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['catalog-load-key'],
      queryFn: expect.any(Function),
    })
  })
})
