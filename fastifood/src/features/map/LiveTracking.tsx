import { getOrderById } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import withLiveStatus from './WithLiveStatus';

const LiveTracking:FC = () => {

    const {currentOrder, setCurrentOrder} = useAuthStore()

    

    const fetchOrderDetails = async () => {
        const data = await getOrderById(currentOrder?._id as any); 
        setCurrentOrder(data);
    }
    

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    let msg = "Đóng gói đơn hàng của bạn"
    let time = "Sẽ đến trong 10 phút nữa..."
    if(currentOrder?.status === 'confirmed'){
        msg = "Sắp đến"
        time = "Sẽ đến trong 8 phút nữa..."
    }
    else if(currentOrder?.status === 'arriving'){
        msg = "Đơn hàng đã nhận"
        time = "Sẽ đến trong 5 phút nữa..."
    }
    else if(currentOrder?.status === 'delivered'){
        msg = "Đơn hàng đã giao"
        time = "Giao hàng nhanh nhất có thể"
    }
    

    return (
        <View style={styles.container}>
            <LiveHeader  type='Customer' title={msg} secondTitle={time}/>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <LiveMap />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name={currentOrder?.deliveryPartner ? 'phone': 'shopping'} color={Colors.disabled} size={RFValue(20)}/>
                    </View>
                    <View style={{width: '82%'}}>
                        <CustomText numberOfLines={1} variant='h6' fontFamily={Fonts.SemiBold}>
                            {currentOrder?.deliveryPartner?.name || "Chúng tôi sẽ sớm chỉ định người giao hàng"}
                        </CustomText>
                        {currentOrder?.deliveryPartner && 
                        <CustomText variant='h6' fontFamily={Fonts.Medium}>
                            {currentOrder?.deliveryPartner?.phone}
                        </CustomText>}
                        
                        <CustomText variant='h7' fontFamily={Fonts.Medium} >
                            {currentOrder?.deliveryPartner? "Để biết hướng dẫn giao hàng bạn có thể liên hệ tại đây": msg }
                        </CustomText>
                    </View>  
                </View>
                

                <DeliveryDetails details={currentOrder?.customer}/>
                <OrderSummary order={currentOrder} />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name='cards-heart-outline' color={Colors.disabled} size={RFValue(20)}/>
                    </View>
                    <View style={{width: '82%'}}>
                       
                        <CustomText numberOfLines={1} variant='h6' fontFamily={Fonts.SemiBold}>
                            Bạn có thích ứng dụng của tôi không? 
                        </CustomText>
                        {currentOrder?.deliveryPartner && 
                        <CustomText variant='h6' fontFamily={Fonts.Medium}>
                           Cảm ơn vì đã xem ứng dụng của chúng tôi
                        </CustomText>}
                        
                    </View>  
                </View>


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.delivery
    },
    scrollContainer:{
        paddingBottom:150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        paddingVertical:10,
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border
    },
    iconContainer:{
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default withLiveStatus(LiveTracking);