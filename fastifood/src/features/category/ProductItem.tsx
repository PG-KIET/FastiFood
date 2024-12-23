import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import { Colors, Fonts } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ProductItem:FC<{item:any; index: number}> = ({item, index}) => {

    const isSecondColumn = index%2 != 0

    return (
        <View style={[styles.container, {marginRight: isSecondColumn? 10: 0}]}>
            <View style={styles.imageContainer}>
                <Image source={{uri:item.image}} style={styles.image}/>
            </View>
            <View style={styles.content}>
                <View style={styles.flexRow}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon}/>
                    <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}> 8 Phút</CustomText>
                </View>

                <CustomText variant='h6' numberOfLines={2} style={{marginVertical: 4}} fontFamily={Fonts.Medium}>
                    {item.name}
                </CustomText>
                <View style={styles.priceContainer}>
                        <View style={{marginRight: 4}}>
                            <CustomText variant='h7' fontFamily={Fonts.Medium}>{item?.price}đ</CustomText>
                            <CustomText variant='h7'  fontFamily={Fonts.Medium} style={{opacity: 0.8, textDecorationLine: 'line-through'}}>{item?.discountPrice}đ</CustomText>
                        </View>
                        <UniversalAdd item={item}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: "#FFF",
        marginBottom: 10,
        marginLeft: 10,
        overflow: 'hidden'
    },
    imageContainer:{
        height: screenHeight * 0.14,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    image:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        aspectRatio: 1/1
    },
    content:{
        flex: 1,
        paddingHorizontal: 10
    },
    flexRow:{
        flexDirection: 'row',
        padding: 2,
        borderRadius: 4,
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.backgroundSecondary,
        alignSelf: 'flex-start'
    },
    clockIcon:{
        height: 15,
        width: 15
    },
    priceContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginTop: 'auto'
    }
})

export default ProductItem;