import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductListScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Product details navigation
  const goToProductDetails = (productId, productName, productImage, productPrice, productDescription) => {
    navigation.navigate('Product Details', {
      productId,
      productName,
      productImage,
      productPrice,
      productDescription,
    });
  };

  // Refresh data
  const onRefresh = useCallback(() => {
    fetchProducts();
  }, []);

  // Fetch data
  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://private-7b891ff-product117.apiary-mock.com/products');
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Text style={styles.heading}>Product List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        placeholderTextColor="black"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToProductDetails(item.id, item.title, item.imageUri, item.price, item.description)}>
              <View style={styles.productItem}>
                <Image source={{ uri: item.imageUri }} style={styles.productImage} />
                <View style={styles.productTextContainer}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productTextContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
  },
});
