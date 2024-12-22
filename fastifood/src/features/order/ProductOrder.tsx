import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OrderList from './OrderList';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { useCartStore } from '@state/cartStore';
import BillDetails from './BillDetails';
import { hocStyles } from '@styles/GlobalStyles';
import { useAuthStore } from '@state/authStore';
import ArrowButton from '@components/ui/ArrowButton';
import { navigate } from '@utils/NavigationUtil';
import { createOrder } from '@service/orderService';

const ProductOrder: FC = () => {

    const {getTotalPrice, cart, clearCart } = useCartStore()

    const {user, setCurrentOrder, currentOrder} = useAuthStore()

    const totalItemPrice = getTotalPrice()

    const [loading, setLoading] = useState(false)


    const handlePlaceOrder = async() =>{
        if(currentOrder !== null){
            Alert.alert("Let your first order to be delivered")
            return 
        }
        const formattedData = cart.map(item => ({
            id: item._id,
            item: item._id,
            count: item.count
        }))
        if(formattedData.length == 0){
            Alert.alert("Add any items to place order")
            return 
        }

       

        setLoading(true)
        const data =await createOrder(formattedData, totalItemPrice)

        if(data != null){
            setCurrentOrder(data)
            clearCart()
            navigate('OrderSuccess', {...data})
        }
        else{
            Alert.alert("Failed to place order")
        }
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <CustomHeader title='Checkout'/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList />

                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow} >
                        <Image  source={require('@assets/icons/coupon.png')} style={{width: 25, height: 25}}/>
                        <CustomText variant='h6' fontFamily={Fonts.SemiBold}>Sử dụng phiếu giảm giá</CustomText>
                    </View>
                <   Icon  name='chevron-right' size={RFValue(16)} color={Colors.text}/>
                </View>
                <BillDetails totalItemPrice={totalItemPrice}/>

                <View style={styles.flexRowBetween}>
                    <View>
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                            Chính sách hủy bỏ
                        </CustomText>
                        <CustomText variant='h8' style={styles.cancelText} fontFamily={Fonts.SemiBold}>
                            Đơn hàng không thể hủy sau khi đóng gói để giao hàng, Trong trường hợp có sự chậm trễ ngoài ý muốn, chúng tôi sẽ hoàn lại tiền nếu có
                        </CustomText>
                    </View>
                </View>
            </ScrollView>

            <View style={hocStyles.cartContainer}>
                <View style={styles.absoluteContainer}>
                    <View style={styles.addressContainer}>
                        <View style={styles.flexRow}>
                            <Image source={require('@assets/icons/home.png')} style={{width:20, height:20}}/>
                            <View style={{width: '70%'}}>
                                <CustomText variant='h7' fontFamily={Fonts.Medium}>Giao hàng tận nhà</CustomText>
                                <CustomText variant='h8' numberOfLines={2} style={{opacity: 0.6}}>{user?.address}</CustomText>
                            </View>
                        </View>
                        {/* <TouchableOpacity >
                            <CustomText variant='h7' style={{color:Colors.secondary}} fontFamily={Fonts.Bold}>Thay đổi</CustomText>
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.paymentGateway}>
                        <View style={{width:'35%'}}>
                            <CustomText variant='h7' fontFamily={Fonts.Bold} >THANH TOÁN</CustomText>
                            <CustomText fontFamily={Fonts.Regular} variant='h7' style={{marginTop: 2}}>Thanh toán khi nhận hàng</CustomText>
                        </View>
                        <View style={{width:'65%'}}>
                            <ArrowButton
                              loading={loading}
                              price={totalItemPrice}
                              title="Place Order"
                              onPress={ async() => {
                                await handlePlaceOrder()
                              }}
                              />
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    absoluteContainer:{
        marginVertical: 15,
        marginBottom: Platform.OS == 'ios'? 30: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer:{
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250
    },
    flexRowBetween:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 15,
    },
    flexRow:{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    cancelText:{
        marginTop: 4,
        opacity: 0.6
    },
    addressContainer:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom:10,
        borderBottomWidth: 0.7,
        borderColor: Colors.border
    },
    paymentGateway:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft: 14
    }
})

export default ProductOrder;