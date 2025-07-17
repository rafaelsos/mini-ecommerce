import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { LoadingComponent } from '@/shared/components/Loading/LoadingComponent'
import { TStackScreenProps } from '@/shared/routes/RouteConfig.types'
import { COLORS } from '@/shared/theme/colors'
import { makeCatalogLoad } from '@/features/catalog/data/CatalogLoad'

const ItemSeparator = () => <View style={styles.itemSeparator} />

export const CatalogScreen: React.FC<TStackScreenProps<'Catalog'>> = ({
  navigation,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['catalog-load-key'],
    queryFn: () => makeCatalogLoad.handle(),
  })

  if (isLoading) {
    return <LoadingComponent testID="loading-indicator" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`product-item-${item.id}`}
            onPress={() =>
              navigation.navigate('ProductDetails', { productId: item.id })
            }
            style={styles.itemContainer}
          >
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ItemSeparator}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  testText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black100,
  },
  flatListContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    maxWidth: '48%',
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 4,
    gap: 4,
    elevation: 3,
    shadowColor: COLORS.black100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemSeparator: {
    height: 16,
  },
  image: {
    width: '100%',
    height: 173,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.black100,
  },
  price: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.blue100,
  },
})
