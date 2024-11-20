import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Header:FC<{showNotice:()=> void}> = ({showNotice}) => {

    const {setUser, user} = useAuthStore()

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity>
        <CustomText fontFamily={Fonts.Bold} variant='h7' style={styles.text}>
            Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
            <CustomText fontFamily={Fonts.SemiBold} variant='h2' style={styles.text}>
                15-20 minutes
            </CustomText>
           <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                <CustomText style={{color: '#3B4886'}} fontFamily={Fonts.SemiBold} fontSize={RFValue(10)}>
                    🌧 Rain
                </CustomText>
           </TouchableOpacity>
        </View>

        <View style={styles.flexRow}>
            <CustomText variant='h7' numberOfLines={1} fontFamily={Fonts.Medium} style={styles.text2}>
                {user?.address || 'Knowhere, Somewhere'}
            </CustomText>
            <Icon name='menu-down' color='#fff' size={RFValue(20)} style={{bottom: -1}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <Icon name='account-circle-outline' color='#fff' size={RFValue(36)}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    text:{
        color: '#fff'
    },
    text2:{
        color: '#fff',
        width: '90%',
        textAlign: 'center'
    },
    flexRow:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        width: '70%'
    },
    flexRowGap:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    noticeBtn:{
        backgroundColor: '#E8EAF5',
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -2
    },
    subContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? 10 : 5,
        justifyContent: 'space-between'
    },
})

export default Header;