// LiveMap.tsx
import { handleFitToPath } from '@components/map/mapUtils';
import MapViewConponent from '@components/map/MapView';
import { useMapRefStore } from '@state/mapStore';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LatLng {
    latitude: number;
    longitude: number;
  }

interface LiveMapProps {
  deliveryLocation: LatLng;
  deliveryPersonLocation: LatLng;
  pickupLocation: LatLng;
  hasPickedUp: boolean;
  hasAccepted: boolean;
}

const LiveMap: FC<LiveMapProps> = ({ deliveryLocation, deliveryPersonLocation, hasAccepted, hasPickedUp, pickupLocation }) => {
  const { mapRef, setMapRef } = useMapRefStore();

  useEffect(() => {
    if (mapRef) {
      handleFitToPath(
        mapRef,
        deliveryLocation,
        pickupLocation,
        hasPickedUp,
        hasAccepted,
        deliveryPersonLocation
      );
    }
  }, [mapRef, deliveryPersonLocation, hasAccepted, hasPickedUp]);

  return (
    <View style={styles.container}>
      <MapViewConponent />
      <TouchableOpacity style={styles.fitBtn}>
        <Icon name="target" size={RFValue(14)} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  fitBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 5,
    shadowColor: 'black',
    borderRadius: 35,
  },
});

export default LiveMap;
