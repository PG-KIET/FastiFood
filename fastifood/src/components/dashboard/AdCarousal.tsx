import ScalePress from '@components/ui/ScalePress';
import { screenWidth } from '@utils/Scaling';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const AdCarousal: FC<{ adData: any }> = ({ adData }) => {

    return (
        <View style={styles.carouselContainer}>
            <Swiper
                autoplay
                autoplayTimeout={3}  // Thời gian giữa các slide (3 giây)
                loop={true}           // Cho phép lặp lại
                showsPagination={false}  // Ẩn các chấm phân trang nếu không cần
                width={screenWidth}
                height={screenWidth * 0.5}  // Chiều cao carousel
            >
                {adData.map((item: any, index: number) => (
                    <ScalePress key={index} style={styles.imageContainer}>
                        <Image source={item} style={styles.img} />
                    </ScalePress>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
});

export default AdCarousal;
