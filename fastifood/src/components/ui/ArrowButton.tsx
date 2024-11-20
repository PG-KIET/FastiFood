import {Colors, Fonts} from '@utils/Constants';
import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomText from './CustomText';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ArrowButtonProps {
  title: string;
  onPress?: () => void;
  price?: number;
  loading?: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  title,
  onPress,
  price,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading}
      onPress={onPress}
      style={[styles.btn, {justifyContent: price != 0 ? 'space-between' : 'center'}]}>
      {price != 0 && price && 
        <View>
            <CustomText variant='h7' style={{color: 'white'}} fontFamily={Fonts.Medium}>
                ${price + 34}
            </CustomText>
           
        </View>}

        <View style={styles.flexRow}>
                <CustomText variant='h6' style={{color:'#fff'}} fontFamily={Fonts.Medium}>
                    {title}
                </CustomText>
                {loading ? <ActivityIndicator
                    color='white'
                    size='small'
                    style={{marginHorizontal: 5}}
                />:
                <Icon name='arrow-right' color='#fff' size={RFValue(25)}/>}
        </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArrowButton;
