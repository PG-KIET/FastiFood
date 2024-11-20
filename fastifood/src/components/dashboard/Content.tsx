import { adData, categories } from '@utils/dummyData';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AdCarousal from './AdCarousal';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
        Best Sellers
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
        Snanks & Drinks
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
        Home & LifeStyle
      </CustomText>
      <CategoryContainer data={categories}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20
  }
})

export default Content;