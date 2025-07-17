import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { TStackScreenProps } from '@/shared/routes/RouteConfig.types'
import { COLORS } from '@/shared/theme/colors'
import { AppDispatch } from '@/shared/store/StoreConfig'
import { removeProductCart } from '@/shared/store/cart/CartCreators'
import { selectCart, selectCartTotal } from '@/shared/store/cart/CartSelectors'
import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimaryComponent'
import {
  horizontalScale,
  verticalScale,
  fontScale,
} from '@/shared/utils/scaling'
import IconTrash from '@/shared/assets/icons/icon-trash.svg'

const ItemSeparator = () => <View style={styles.itemSeparator} />

export const CartScreen: React.FC<TStackScreenProps<'Cart'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const storeCart = useSelector(selectCart)
  const storeCartTotal = useSelector(selectCartTotal)

  return (
    <View style={styles.container}>
      <FlatList
        data={storeCart?.products}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.containerEmpty}>
            <Text style={styles.textEmpty}>Seu carrinho está vazio</Text>
            <Button
              title="Voltar para o catálogo"
              onPress={() => {
                navigation.navigate('Catalog')
              }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.containerItem}>
            <View style={styles.containerImage}>
              <Image
                source={{ uri: item.image }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>

            <View style={styles.contentDetail}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={() => dispatch(removeProductCart({ id: item.id }))}
              style={styles.buttonTrash}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Remover produto"
              accessibilityHint="Toque para remover este produto do carrinho"
            >
              <IconTrash />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.flatListContent}
      />

      {storeCart && storeCart?.products.length > 0 && (
        <View style={styles.containerSummary}>
          <View style={styles.contentSummary}>
            <Text style={styles.textSummary}>Total: </Text>
            <Text style={styles.textSummary}>
              R${storeCartTotal.toFixed(2)}
            </Text>
          </View>

          <ButtonPrimary
            title="Finalizar compra"
            onPress={() => {
              // Handle checkout
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEmpty: {
    textAlign: 'center',
    fontSize: fontScale(16),
    fontWeight: '500',
    color: COLORS.black100,
  },
  flatListContent: {
    flex: 1,
    marginTop: verticalScale(16),
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
  itemSeparator: {
    height: verticalScale(16),
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    width: horizontalScale(80),
    height: verticalScale(80),
  },
  contentDetail: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: fontScale(14),
    fontWeight: '500',
    color: COLORS.black100,
  },
  quantity: {
    fontSize: fontScale(12),
    color: COLORS.blue200,
  },
  buttonTrash: {
    padding: horizontalScale(8),
    minWidth: horizontalScale(44),
    minHeight: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSummary: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(16),
    gap: 16,
  },
  contentSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSummary: {
    fontSize: fontScale(18),
    color: COLORS.black100,
    fontWeight: '400',
  },
})
