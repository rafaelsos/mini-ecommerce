import { HttpConfig } from '@/shared/infra/HttpConfig/httpConfig'
import { IProduct } from '@/features/catalog/domain/ProductEntity.types'

class ProductByLoad {
  static create() {
    return new ProductByLoad()
  }

  handle = async (params: { productId: number }): Promise<IProduct> => {
    return HttpConfig.get<IProduct>(`/products/${params.productId}`)
  }
}

export const makeProductByLoad = ProductByLoad.create()
