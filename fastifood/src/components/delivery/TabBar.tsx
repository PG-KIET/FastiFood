import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface TabBarProps {
  selectedTab: 'available' | 'delivery';
  onTabChange: (tab: 'available' | 'delivery') => void;
}

const TabBar: FC<TabBarProps> = ({selectedTab,onTabChange}) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity activeOpacity={0.8} 
                style={[styles.tab, 
                    selectedTab == 'available' && styles.activeTab]}
                    onPress={()=> onTabChange('available')}>
                <CustomText variant='h7' fontFamily={Fonts.SemiBold} 
                    style={[styles.tabText,  
                    selectedTab === 'available' ? styles.activeTabText: styles.inactiveTabText]}>
                    Sẵn sàng
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} 
                style={[styles.tab, 
                    selectedTab != 'available' && styles.activeTab]}
                    onPress={()=> onTabChange('delivery')}>
                <CustomText variant='h7' fontFamily={Fonts.SemiBold} 
                    style={[styles.tabText,  
                    selectedTab !== 'available' ? styles.activeTabText: styles.inactiveTabText]}>
                    Giao hàng
                </CustomText>
            </TouchableOpacity>
            
        </View>
    )
    
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 2,
        width: '38%',
        margin: 10,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: Colors.delivery,
        borderColor: Colors.delivery,
    },
    tabText: {
        color: Colors.text,
    },
    activeTabText: {
        color: '#fff',
    },
    inactiveTabText: {
        color: Colors.disabled,
    },
});

export default TabBar;
