import { HttpConfig } from '@/shared/infra/HttpConfig/httpConfig'
import { IProduct } from '@/features/catalog/domain/ProductEntity.types'

class CatalogLoad {
  static create() {
    return new CatalogLoad()
  }

  handle = async (): Promise<IProduct[]> => {
    return HttpConfig.get<IProduct[]>('/products')
  }
}

export const makeCatalogLoad = CatalogLoad.create()
