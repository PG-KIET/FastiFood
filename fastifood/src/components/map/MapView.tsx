import CustomText from '@components/ui/CustomText';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';



const MapViewComponent = ({
  mapRef,
  hasAccepted,
  setMapRef,
  camera,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  hasPickedUp,
}: any) => {
  return (
    <View style={styles.page}>
      <Image source={require('@assets/images/map.png')} style={styles.img} />
  </View>
);
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
},
});

export default MapViewComponent;