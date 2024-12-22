    import CustomText from '@components/ui/CustomText';
    import { Colors, Fonts } from '@utils/Constants';
    import React, { FC } from 'react';
    import {StyleSheet, Text, View} from 'react-native';
    import { RFValue } from 'react-native-responsive-fontsize';
    import Icon from 'react-native-vector-icons/MaterialIcons';

    const ReportItem: 
        FC<{
            iconName:string; 
            underline?: boolean
            title: string;
            price: number
        }> = ({iconName, underline, title, price}) =>{
            return (
            <View style={[styles.flexRowBetween, {marginBottom:10}]}>
                    <View style={styles.flexRow}>
                        <Icon name={iconName} style={{opacity:0.7}} size={RFValue(12)} color={Colors.text}/>
                        <CustomText 
                        style={{textDecorationLine: underline? 'underline': 'none', textDecorationStyle: 'dashed'}}
                        variant='h7'>
                            {title}
                        </CustomText>
                    </View>
                    <CustomText variant='h7'>{price}đ</CustomText>
            </View>
            );
        }

    const BillDetails:FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
        return (
            <View style={styles.container}>
                <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>Chi tiết hóa đơn</CustomText>

                <View style={styles.billContainer}>
                    <ReportItem iconName='article' title='Tổng Số tiền sản phẩm' price={totalItemPrice}/>
                    <ReportItem iconName='pedal-bike' title='Phí vận chuyển' price={15000}/>
                    <ReportItem iconName='cloudy-snowing' title='Phụ phí' price={3000}/>
                </View>
                <View style={[styles.flexRowBetween]}>
                    <CustomText variant='h6' style={styles.text} fontFamily={Fonts.SemiBold}>Tổng cộng</CustomText>
                    <CustomText  style={styles.text} fontFamily={Fonts.SemiBold}>{totalItemPrice + 18000}đ</CustomText>
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container:{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 15
        },
        text:{
            marginHorizontal: 10,
            marginTop: 15
        },
        billContainer:{
            padding: 10,
            paddingBottom: 0,
            borderBottomColor: Colors.border,
            borderBottomWidth: 0.7,
        },
        flexRowBetween:{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 14
        },
        flexRow:{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
        }
    })

    export default BillDetails;