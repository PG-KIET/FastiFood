import DeliveryHeader from '@components/delivery/DeliveryHeader';
import OrderItem from '@components/delivery/OrderItem';
import TabBar from '@components/delivery/TabBar';
import CustomText from '@components/ui/CustomText';
import Geolocation from '@react-native-community/geolocation';
import { updateUserLocation } from '@service/authService';
import { reverseGeocode } from '@service/mapService';
import { fetchOrders } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { Colors } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const DeliveryDashboard:FC = () => {

    const {user, setUser} = useAuthStore()

    const [selectedTab, setSelectedTab] = useState<'available' | 'delivery'>('available')

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<any[]>([])

    const [refreshing, setRefreshing] = useState(false)

   

    const updateUser = async () => {
        Geolocation.getCurrentPosition(
            position =>{
                const {latitude, longitude} = position.coords
                reverseGeocode(latitude, longitude,setUser)

            },
            err => console.log(err),
            {
                enableHighAccuracy: false,
                timeout: 15000,
                
            }
        )
    }

    useEffect(() => {
        updateUser()
    },[])

    const renderOrderItem=({item, index}: any) =>{
        return(
            <OrderItem index={index} item={item}/>
        )
    }

    const fetchData = async () => {
        setData([])
        setRefreshing(true)
        setLoading(true)
        const data = await fetchOrders(selectedTab, user?._id, user?.branch)
        setData(data)
        setRefreshing(false)
        setLoading(false)
    }

    useEffect(()=>{
        fetchData()

    },[selectedTab])


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <DeliveryHeader name={user?.name} email={user?.email} />
            </SafeAreaView>
            <View style={styles.subContainer}>
                <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
                <FlatList
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={async () => await fetchData()}
                        />
                    }
                    ListEmptyComponent={()=> {
                        if(loading){
                            return(
                                <View style={styles.center}>
                                   <ActivityIndicator  color={Colors.secondary} size='small' />
                                </View>
                            )
                        }
                        return(
                            <View style={styles.center}>
                                <CustomText variant='h7' >
                                Chưa tìm thấy đơn hàng nào
                                </CustomText>
                            </View>
                        )
                    }}
                    renderItem={renderOrderItem}
                    keyExtractor={(item)=>item.orderId}
                    contentContainerStyle={styles.flatlistContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1
    },
    subContainer:{
        backgroundColor: Colors.backgroundSecondary,
        padding: 6,
        flex: 1
    },
    flatlistContainer:{
        padding: 2
    },
    center:{
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default DeliveryDashboard;