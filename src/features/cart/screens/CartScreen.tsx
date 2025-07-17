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
import { selectCart } from '@/shared/store/cart/CartSelectors'
import { ButtonPrimary } from '@/shared/components/ButtonPrimary/ButtonPrimaryComponent'
import IconTrash from '@/shared/assets/icons/icon-trash.svg'

const ItemSeparator = () => <View style={styles.itemSeparator} />

export const CartScreen: React.FC<TStackScreenProps<'Cart'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const storeCart = useSelector(selectCart)

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
              R$
              {storeCart.products
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
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
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black100,
  },
  flatListContent: {
    flex: 1,
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 16,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  containerImage: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
    width: 80,
    height: 80,
  },
  contentDetail: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black100,
  },
  quantity: {
    fontSize: 12,
    color: COLORS.blue200,
  },
  buttonTrash: {
    padding: 8,
  },
  containerSummary: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  contentSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSummary: {
    fontSize: 18,
    color: COLORS.black100,
    fontWeight: '400',
  },
})
