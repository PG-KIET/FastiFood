import { confirmOrder, getOrderById, sendLiveOrderUpdate } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@components/ui/CustomText';
import LiveHeader from '@features/map/LiveHeader';
import { useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import { hocStyles } from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
import LiveMap from '@features/map/LiveMap';


const DeliveryMap:FC = () => {

    const user = useAuthStore(state =>  state.user)

    const [orderData, setOrderData] = useState<any>(null)
    const [myLocation, setMyLocation] = useState<any>(null)
    const route = useRoute()

    const orderDetails = route?.params as Record<string,any>
    const {setCurrentOrder} = useAuthStore()

    const fetchOrderDetails = async () => {
        const data = await getOrderById(orderDetails?._id as any); 
        setOrderData(data);
    }
    

    useEffect(() => {
        fetchOrderDetails()
    }, [])


    useEffect(()=>{
        const watchId = Geolocation.watchPosition(
            async (position) => {
                const {latitude, longitude} = position.coords
                setMyLocation({latitude, longitude})
            },
            (err) => console.log("Error Fetching Geolocation", err),
            {enableHighAccuracy: true, distanceFilter: 2}
        )
        return () => Geolocation.clearWatch(watchId);
    },[])


    const acceptOrder = async () => {
        const data = await confirmOrder(orderDetails?._id, myLocation)
        if(data){
            setCurrentOrder(data)
            Alert.alert("Order Accepted")
        }
        else{
            Alert.alert("Failed to accept order")
        }
        fetchOrderDetails()
    }
    const orderPickedUp = async () => {
        const data = await sendLiveOrderUpdate(orderDetails?._id, myLocation, 'arriving')
        if(data){
            setCurrentOrder(data)
            Alert.alert("Order Accepted")
        }
        else{
            Alert.alert("Failed to accept order")
        }
        fetchOrderDetails()
    }
    const orderDelivery = async () => {
        const data = await sendLiveOrderUpdate(orderDetails?._id, myLocation, 'delivered')
        if(data){
            setCurrentOrder(data)
            Alert.alert("Order Accepted")
        }
        else{
            Alert.alert("Failed to accept order")
        }
        fetchOrderDetails()
    }


    let message = "Start this order"
    if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'confirmed'){
        message = "Grab your order"   
    }
    else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'arriving'){
        message = "Complete your order"
    }
    else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'delivered'){
        message = "Your milestone"
    }
    else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status != 'available'){
        message = "Your missed it"
    }

    useEffect(()=>{
        async function sendLiveUpdate() {
            if(orderData?.deliveryPartner?._id == user?._id 
                && orderData?.status != 'delivered'
                && orderData?.status != 'cancelled'
            ){
                await sendLiveOrderUpdate(orderData?._id,myLocation,orderData?._status)
                fetchOrderDetails()
            }
        }
    },[myLocation])
    
    return (
        <View style={styles.container}>
            <LiveHeader  type='Delivery' title={message} secondTitle='Delivery in 10 mninute'/>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <LiveMap/>

                <DeliveryDetails details={orderData?.customer}/>
                <OrderSummary order={orderData} />

                <View style={styles.flexRow}>
                    <View style={styles.iconContainer}>
                        <Icon name='cards-heart-outline' color={Colors.disabled} size={RFValue(20)}/>
                    </View>
                    <View style={{width: '82%'}}>
                       
                        <CustomText numberOfLines={1} variant='h6' fontFamily={Fonts.SemiBold}>
                        Bạn có thích ứng dụng của tôi không?
                        </CustomText>
                        {orderData?.deliveryPartner && 
                        <CustomText variant='h6' fontFamily={Fonts.Medium}>
                           Cảm ơn vì đã xem ứng dụng của chúng tôi
                        </CustomText>}
                        
                    </View>  
                </View>
            </ScrollView>

            {orderData?.status != 'delivered' && orderData?.status!='cancelled' && 
                <View style={[hocStyles.cartContainer, styles.btnContainer]}>
                    {orderData?.status == 'available' && 
                    <CustomButton
                        disabled={false}
                        title='Accept Order'
                        onPress={acceptOrder}
                        loading={false}
                    />}
                    {orderData?.status == 'confirmed' && 
                        orderData?.deliveryPartner?._id === user?._id &&
                    <CustomButton
                        disabled={false}
                        title='Order Pickup'
                        onPress={orderPickedUp}
                        loading={false}
                    />}
                     {orderData?.status == 'arriving' && 
                        orderData?.deliveryPartner?._id === user?._id &&
                    <CustomButton
                        disabled={false}
                        title='Delivered'
                        onPress={orderDelivery}
                        loading={false}
                    />}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.primary
    },
    scrollContainer:{
        paddingBottom:150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15
    },
    btnContainer:{
        padding: 10,
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

export default DeliveryMap;