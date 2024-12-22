import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const OrderItem:FC<{item: any}> = ({item}) => {
  return (
    <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
            <Image source={{uri: item?.item?.image}} style={styles.img} />
        </View>
        <View style={{width:'55%'}}>
            <CustomText numberOfLines={2} variant='h7' fontFamily={Fonts.Medium}>
                {item.item.name}
            </CustomText>
            <CustomText variant='h8'>
                {item.item.quantity}
            </CustomText>
        </View>
        <View style={{width: '20%', alignItems: 'flex-end'}}>
            <UniversalAdd item={item.item} />
            <CustomText variant='h7' fontFamily={Fonts.Medium} style={{alignSelf:'flex-end', marginTop: 4}}>
                {item.count * item.item.price}đ
            </CustomText>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    img:{
        width: 40,
        height: 40,
    },
    imgContainer:{
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%'
    },
    flexRow:{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderTopColor: Colors.border,
        borderTopWidth: 0.6,
    }
})

export default OrderItem;