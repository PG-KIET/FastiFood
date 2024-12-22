import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/Ionicons';

const WalletItem:FC<{icon:string; label: string}> = ({icon, label}) => {
    return (
        <View style={styles.walletItemContaineter}>
            <Icon name={icon} color={Colors.text} size={RFValue(25)}/>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>{label}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    walletItemContaineter:{
        alignItems: 'center',
    }

})
export default WalletItem;