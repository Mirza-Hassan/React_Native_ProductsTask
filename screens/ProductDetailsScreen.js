import React, { useEffect, useRef } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailsScreen({ route }) {

  // Error handling
  if (!route.params || !route.params.productName || !route.params.productImage || !route.params.productPrice || !route.params.productDescription) {
    return (
      <Text style={styles.errorText}>Please kindly select a product item from the list.</Text>
    );
  }

  const { productName, productImage, productPrice, productDescription } = route.params;

  // Navigation
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  // Animation effect
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <Text style={styles.heading}>Product Details</Text>
      <Text style={styles.productTitle}>{productName}</Text>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <Text style={styles.productPrice}>{productPrice}</Text>
      <Text style={styles.productDescription}>{productDescription}</Text>
      <TouchableOpacity onPress={goBack} style={styles.goBackLink}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  productImage: {
    width: '40%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  goBackLink: {
    marginTop: 20,
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
  goBackText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'none',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});