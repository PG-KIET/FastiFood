import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import { fetchCustomerOrders } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { useCartStore } from '@state/cartStore';
import { Fonts } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import { storage, tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtil';

const Profile:FC = () => {

    const [order, setOrders] = useState([])
    const { logout, user} = useAuthStore()
    const {clearCart} = useCartStore()

    const fetchOrders = async () => {
        const data = await fetchCustomerOrders(user?._id)
        setOrders(data)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const renderHeader = () => {
        return (
            <View >
                <CustomText variant='h3' fontFamily={Fonts.SemiBold}>Tài khoản của bạn {user?.name}</CustomText>
                <CustomText variant='h7' fontFamily={Fonts.Medium}>{user?.phone}</CustomText>
                <CustomText variant='h7' fontFamily={Fonts.Medium}>{user?.address}</CustomText>
                <WalletSection />
                <CustomText variant='h8' style={styles.inforText} fontFamily={Fonts.Medium}>Thông tin của bạn</CustomText> 
                <ActionButton icon='book-outline' label='Address book'/>
                <ActionButton icon='information-circle-outline' label='About us'/>
                <ActionButton icon='log-out-outline' label='Log out' onPress={()=>{
                    clearCart()
                    logout()
                    tokenStorage.clearAll()
                    storage.clearAll()
                    resetAndNavigate("CustomerLogin")
                }}/>
                <CustomText variant='h7' style={styles.pastText}>
                    ĐƠN HÀNG TRƯỚC ĐÂY
                </CustomText>
            </View>
               
        )
    }

    const renderOrders = ({item, index} : any) => {
        return(
            <OrderItem item={item} index={index}/>
        )
    }
    return (
        <View style={styles.container}>
            <CustomHeader title='Profile' />

            <FlatList 
            data={order}
            ListHeaderComponent={renderHeader}
            renderItem={renderOrders}
            keyExtractor={(item:any) => item?.orderId}
            contentContainerStyle={styles.scrollViewContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollViewContainer:{
        padding: 10,
        paddingTop: 20,
        paddingBottom: 100
    },
    inforText:{
        opacity: 0.7,
        marginBottom: 20
    },
    pastText:{
        marginVertical: 20,
        opacity: 0.7,

    }
})

export default Profile;