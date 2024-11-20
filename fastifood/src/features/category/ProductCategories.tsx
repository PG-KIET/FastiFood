import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import SideBar from './SideBar';
import { getAllCategories, getProductByCategoryId } from '@service/productService';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';

const ProductCategories:FC = () => {

    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategories, setSelectedCategories] = useState<any>(null)
    const [product, setProducts] = useState<any[]>([])
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [productLoading, setProductsLoading] = useState<boolean>(false)
    

    const fetchCategories = async() => {
        try {
            setCategoriesLoading(true)
            const  data = await getAllCategories()
            setCategories(data)
            if(data && data.length > 0){
                setSelectedCategories(data[0])
            }
        } catch (error) {
            console.log("Error fetching categories", error);
        } finally {
            setCategoriesLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories()
    },[]);


    
    const fetchProducts = async(categoryId:string) => {
        try {
            setProductsLoading(true)
            const  data = await getProductByCategoryId(categoryId)
            setProducts(data)
        } catch (error) {
            console.log("Error fetching Products", error);
        } finally {
            setProductsLoading(false);
        }
    }

    useEffect(() => {
        if(selectedCategories){
            fetchProducts(selectedCategories?._id)
        }
    },[selectedCategories]);

    return (
        <View style={styles.mainContainer}>
            <CustomHeader title={selectedCategories?.name || "Categories"} search/>
            <View style={styles.subContainer}>
                {categoriesLoading ? (<ActivityIndicator size='small' color={Colors.border}/>): 
                (
                    <SideBar
                        categories={categories}
                        selectedCategory={selectedCategories}
                        onCategoryPress = {(category: any)=> setSelectedCategories(category)}
                    />
                )
                }  
                {productLoading?
                            (<ActivityIndicator size='small' color={Colors.border} style={styles.center}/>): 
                            (<ProductList data={product || []}/>)}
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
    subContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default withCart(ProductCategories);