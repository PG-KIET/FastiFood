import React, {FC, useEffect, useRef} from 'react';
import {
  StatusBar,
  View,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import Icon  from 'react-native-vector-icons/Ionicons';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import withCart from '@features/cart/WithCart';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard:FC = () => {

    const { scrollY, expand } = useCollapsibleContext();
    const previousScroll = useRef<number>(0);

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScroll.current; // Kiểm tra xem có cuộn lên không
        const opacity = withTiming(isScrollingUp && scrollY.value > 180 ? 1 : 0, { duration: 300 });
        const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 }); // Dịch chuyển nút lên khi cuộn lên

        previousScroll.current = scrollY.value;

        return {
            opacity,
            transform: [{ translateY }],
            zIndex: isScrollingUp ? 1 : -1, // Đảm bảo rằng nút chỉ xuất hiện khi cuộn lên
        };
    });


    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;


    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
        toValue: NOTICE_HEIGHT,
        duration: 1200,
        useNativeDriver: false,
        }).start();
    };
    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        slideDown();
        const timeoutId = setTimeout(() => {
        slideUp();
        }, 3500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <NoticeAnimation noticePosition={noticePosition}>
        <>
            <Visuals />
            <SafeAreaView />

            {/* <Animated.View style={[styles.backToTopBtn, backToTopStyle]}>
                <TouchableOpacity onPress={() => {
                    scrollY.value = 0;
                    expand()
                }}
                 style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                    <Icon name='arrow-up-circle-outline'  color='white' size={RFValue(12)}/>
                    <CustomText variant='h8' style={{color: 'white'}} fontFamily={Fonts.SemiBold}>
                        Back To Top
                    </CustomText>
                </TouchableOpacity>
            </Animated.View> */}


            <CollapsibleContainer style={styles.panelContainer}>
            <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                <AnimatedHeader
                showNotice={() => {
                    slideDown();
                    const timeoutId = setTimeout(() => {
                    slideUp();
                    }, 3500);
                    return () => clearTimeout(timeoutId);
                }}
                />
                <StickSearchBar />
            </CollapsibleHeaderContainer>

            <CollapsibleScrollView
                nestedScrollEnabled
                style={styles.panelContainer}
                showsVerticalScrollIndicator={false}>
                <Content />

                <View
                style={{backgroundColor: '#F8F8F8', padding: 20, marginTop: 10}}>
                <CustomText
                    fontSize={RFValue(32)}
                    fontFamily={Fonts.Bold}
                    style={{opacity: 0.2}}>
                    Henry's app
                </CustomText>
                <CustomText
                    fontFamily={Fonts.Bold}
                    style={{marginTop:10, paddingBottom: 100,opacity: 0.2}}>
                    Developed by Henry
                </CustomText>
                </View>
            </CollapsibleScrollView>
            </CollapsibleContainer>
        </>
        </NoticeAnimation>
    );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopBtn: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999
  }
});

export default withCart(withCollapsibleContext(ProductDashboard));
