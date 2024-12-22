import { Colors, Fonts } from '@utils/Constants';
import React, { FC, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import { goBack } from '@utils/NavigationUtil';

const CustomHeader: FC<{ title: string; search?: boolean; onSearch?: (query: string) => void }> = ({ title, search, onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    // setSearchQuery(''); // Reset search query khi đóng tìm kiếm
    // if (!isSearching && onSearch) {
    //   onSearch(''); // Xóa kết quả tìm kiếm khi đóng tìm kiếm
    // }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text); // Gọi callback onSearch khi người dùng nhập
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" color={Colors.text} size={RFValue(16)} />
        </Pressable>

        {isSearching ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={Colors.backgroundSecondary}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        ) : (
          <CustomText style={styles.text} variant="h4" fontFamily={Fonts.SemiBold}>
            {title}
          </CustomText>
        )}

        {search && (
          <Pressable onPress={toggleSearch}>
            <Icon name={isSearching ? 'close' : 'search'} color={Colors.text} size={RFValue(16)} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {
    textAlign: 'center',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: RFValue(14),
    color: Colors.text,
    backgroundColor: 'white',
  },
});

export default CustomHeader;
