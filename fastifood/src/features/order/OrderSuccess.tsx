import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import { replace } from '@utils/NavigationUtil';
import { screenWidth } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import React, { FC, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';

const OrderSuccess:FC = () => {

    const {user} = useAuthStore()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            replace("LiveTracking")
        }, 2300)
        return () => clearTimeout(timeoutId)
    },[])

    return (
        <View style={styles.container}>
            <LottieView
                source={require('@assets/animations/confirm.json')}
                autoPlay
                duration={2000}
                loop={false}
                speed={1}
                style={styles.lottieView}
                enableMergePathsAndroidForKitKatAndAbove
                hardwareAccelerationAndroid
            />
            <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={styles.orderPlaceText}>
                 ĐẶT HÀNG
            </CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText variant='h4' fontFamily={Fonts.SemiBold} style={styles.deliveryText}>
                Giao hàng tận nhà
                </CustomText>
            </View>          
            <CustomText variant='h7' style={styles.addressText} fontFamily={Fonts.Medium}>
                {user?.address || 'Somewhere, Knowhere'}
            </CustomText>  
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    lottieView:{
        width: screenWidth * 0.6,
        height: 150
    },
    orderPlaceText:{
        opacity: 0.4
    },
    deliveryContainer:{
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors.secondary
    },
    deliveryText:{
        marginTop: 15,
        borderColor: Colors.secondary
    },
    addressText:{
        opacity: 0.8,
        textAlign: 'center',
        width: '80%',
        marginTop: 10
    }

})

export default OrderSuccess;