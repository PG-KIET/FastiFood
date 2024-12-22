import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const DeliveryDetails:FC<{details: any}> = ({details}) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.iconContainer}>
                    <Icon name='bike-fast' color={Colors.disabled} size={RFValue(20)}/>
                </View>
                <View>
                    <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
                        Thông tin vận chuyển của bạn
                    </CustomText>
                    <CustomText variant='h7' fontFamily={Fonts.Medium}>
                        Thông tin vận chuyển hiện tại của bạn
                    </CustomText>
                </View>
            </View>
            <View style={styles.flexRow2}>
                <View style={styles.iconContainer}>
                    <Icon name='map-marker-outline' color={Colors.disabled} size={RFValue(20)}/>
                </View>
                <View style={{width:'80%'}}>
                    <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                        Giao hàng tận nhà
                    </CustomText>
                    <CustomText numberOfLines={2} variant='h7' fontFamily={Fonts.Regular}>
                       {details?.address || '------------------------'}
                    </CustomText>
                </View>
            </View>
            <View style={styles.flexRow2}>
                <View style={styles.iconContainer}>
                    <Icon name='phone-outline' color={Colors.disabled} size={RFValue(20)}/>
                </View>
                <View style={{width:'80%'}}>
                    <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                        {details?.name || '--'} {details?.phone || 'XXXXXXXXX'}
                    </CustomText>
                    <CustomText numberOfLines={2} variant='h7' fontFamily={Fonts.Regular}>
                        Số liên lạc của người nhận:
                    </CustomText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderRadius: 15,
        marginVertical: 15,
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border
    },
    flexRow2:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10
    },
    iconContainer:{
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default DeliveryDetails;