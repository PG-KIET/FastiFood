import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomButton from '@components/ui/CustomButton';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import {deliveryLogin} from '@service/authService';
import {Fonts} from '@utils/Constants';
import {resetAndNavigate} from '@utils/NavigationUtil';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import React, {FC, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('@assets/animations/delivery_man.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>

          <CustomText variant="h3" fontFamily={Fonts.Bold}>
             Cổng thông tin giao hàng
          </CustomText>

          <CustomText variant="h6" style={styles.text} fontFamily={Fonts.Bold}>
            Giao hàng siêu nhanh
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color="#F8890e"
                style={{marginLeft: 15}}
                size={RFValue(18)}
              />
            }
            placeholder='Email'
            inputMode='email'
            right={false}
          />
           <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                color="#F8890e"
                style={{marginLeft: 15}}
                size={RFValue(18)}
              />
            }
            placeholder='Password'
            secureTextEntry
            right={false}
          />
          <CustomButton
            disabled={email.length == 0 || password.length < 8}
            title='Login'
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
