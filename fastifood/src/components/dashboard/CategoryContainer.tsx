import ScalePress from '@components/ui/ScalePress';
import React, { FC } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {navigate} from '@utils/NavigationUtil'  
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const CategoryContainer:FC<{data: any}> = ({data}) => {

    const renderItems = (item: any[])=>{
        return (<>{item.map((item, index) => {
           return(
            <ScalePress onPress={()=> navigate('ProductCategories')} key={index} style={styles.item}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <CustomText style={styles.text} variant='h8' fontFamily={Fonts.Medium}> {item.name}</CustomText>
            </ScalePress>
           )
        })}</>
    )
    }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderItems(data?.slice(0,4))}
      </View>
      <View style={styles.row}>
        {renderItems(data?.slice(4))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
        marginVertical:15
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    text:{
        textAlign: 'center'
    },
    item:{
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer:{
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#E55F3F3',
        marginBottom: 8
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    }
})

export default CategoryContainer;