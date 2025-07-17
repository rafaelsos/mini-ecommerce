import { useCallback } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { LoadingComponent } from '@/shared/components/Loading/LoadingComponent'
import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimaryComponent'
import { TStackScreenProps } from '@/shared/routes/RouteConfig.types'
import { addToCart } from '@/shared/store/cart/CartCreators'
import { AppDispatch } from '@/shared/store/StoreConfig'
import { COLORS } from '@/shared/theme/colors'
import {
  horizontalScale,
  verticalScale,
  fontScale,
} from '@/shared/utils/scaling'
import { IProduct } from '@/features/catalog/domain/ProductEntity.types'
import { makeProductByLoad } from '@/features/catalog/data/ProductByIdLoad'

export const ProductDetailsScreen: React.FC<
  TStackScreenProps<'ProductDetails'>
> = ({ route, navigation }) => {
  const { productId } = route.params

  const dispatch = useDispatch<AppDispatch>()

  const { data, isLoading } = useQuery({
    queryKey: ['product-detail-key'],
    queryFn: () => makeProductByLoad.handle({ productId }),
  })

  const handleAddToCart = useCallback(
    (params: IProduct) => {
      dispatch(addToCart(params))

      navigation.reset({
        index: 0,
        routes: [{ name: 'CartTab' }],
      })
    },
    [dispatch, navigation],
  )

  if (isLoading) {
    return <LoadingComponent testID="loading-indicator" />
  }

  if (!data) {
    return (
      <View testID="product-not-found" style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerImage}>
          <Image
            source={{ uri: data?.image }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <Text style={styles.price}>Price: ${data?.price}</Text>

        <ButtonPrimary
          testID="add-to-cart-button"
          title="Adicionar ao carrinho"
          onPress={() => handleAddToCart(data)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  content: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
    gap: 16,
  },
  containerImage: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    elevation: 2,
    shadowColor: COLORS.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: verticalScale(250),
  },
  title: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: COLORS.black100,
  },
  description: {
    fontSize: fontScale(12),
    fontWeight: '400',
    color: COLORS.black100,
    lineHeight: fontScale(16),
  },
  price: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: COLORS.blue200,
  },
})
