import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Image, Keyboard, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/NavigationUtil';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse()

const CustomerLogin: FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);
    const keyboardOffsetHeight = useKeyboardOffsetHeight()


    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(()=>{
        if (keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
        else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    },[keyboardOffsetHeight])


    const handleAuth = async() => {
        Keyboard.dismiss()
        setLoading(true)
        try {
            await customerLogin(phoneNumber)
            resetAndNavigate('ProductDashboard')
        } catch (error) {
            Alert.alert('Login Error')
        } finally {
            setLoading(false)
        }
    }

    const handleGesture = ({nativeEvent}: any) => {
        if (
        nativeEvent.state === State.END ||
        nativeEvent.state === State.CANCELLED
        ) {
        const {translationX, translationY} = nativeEvent;
        let direction = '';
        if (Math.abs(translationX) > Math.abs(translationY)) {
            direction = translationX > 0 ? 'right' : 'left';
        } else {
            direction = translationY > 0 ? 'down' : 'up';
        }

        const newSequence = [...gestureSequence, direction].slice(-5);
        setGestureSequence(newSequence);

        console.log(newSequence)
        if (newSequence.join(' ') === 'up up down left right') {
            setGestureSequence([]);
            resetAndNavigate('DeliveryLogin');
        }
        }
    };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{transform: [{ translateY: animatedValue}]}}
              >
                <LinearGradient colors={bottomColors} style={styles.gradient}/>
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/fastifood.png')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  Henry's last minute app{' '}
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Login or Sign up
                </CustomText>
                <CustomInput
                  onChangeText={text => {
                    setPhoneNumber(text.slice(0, 10));
                  }}
                  onClear={() => {
                    setPhoneNumber('');
                  }}
                  value={phoneNumber}
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant="h6"
                      fontFamily={Fonts.SemiBold}>
                      +84
                    </CustomText>
                  }
                  placeholder="Enter phone number"
                  inputMode="numeric"
                />
                <CustomButton
                  title="Continue"
                  disabled={phoneNumber?.length !== 9 && phoneNumber?.length !== 10}
                  onPress={() => handleAuth()}
                  loading={loading}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>

        <View style={styles.footer}>
            <SafeAreaView>
                <CustomText fontSize={RFValue(9)}>
                    By Continuing, you agree to our Terms of Service & Privary Policy
                </CustomText>
            </SafeAreaView>
        </View>


      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneText: {
    marginLeft: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginVertical: 10,
  },
  footer:{
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position:  'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#f8f9fc",
    width: '100%'
  },
  gradient:{
    paddingTop: 40,
    width: '100%',
  }
});

export default CustomerLogin;