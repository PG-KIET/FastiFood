
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { wavyData } from '@utils/dummyData';
import { NoticeHeight } from '@utils/Scaling';
import React, { FC } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { Defs, G, Path, Svg, Use } from 'react-native-svg';

const Notice:FC = () => {
   
    return (
        <View style={{height: NoticeHeight }}>
            <View style={styles.container}>
                <View style={styles.noticeContainer}>
                    <SafeAreaView style={{padding: 10}}>
                        <CustomText style={styles.heading} variant='h7' fontFamily={Fonts.SemiBold}> 
                            Trời đang mưa ở vị trí này
                        </CustomText>
                        <CustomText variant='h8' style={styles.textCenter}>
                            Giao hàng của chúng tôi có thể mất nhiều thời gian hơn để giao tới với bạn
                        </CustomText>
                    </SafeAreaView>
                </View>
            </View>
            <Svg width='100%' height='35' fill='#CCD5E4' viewBox='0 0 4000 1000' preserveAspectRatio='none'
                    style={styles.wave}>
                <Defs>
                    <Path id='wavepath' d={wavyData}/>
                </Defs>
                <G>
                    <Use href="#wavepath" y="321"/>
                </G>
            </Svg>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#CCD5E4'
    },
    noticeContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'CCD5E4'
    },
    textCenter:{
        textAlign: 'center',
        marginBottom: 8
    },
    heading:{
        color: '#2D3875',
        marginBottom: 8,
        textAlign: 'center'
    },
    wave:{
        width: '100%',
        transform: [{rotateX: '180deg'}]
    }
})

export default Notice;
