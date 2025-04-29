import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../../android/app/src/utils/customColor';
import { getTextColor } from '../../helper';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';

const ChatHeader = ({ currentChatUser }) => {
  const navigation = useNavigation();
  const { theme } = useSelector((state) => state.mobile); 
  return (
    <View style={styles.headerContainer}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
              name="chevron-small-left"
              size={28} 
              color={customColor.Light}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: /*currentChatUser.image || */ "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }}
          style={styles.profileImg}
        />
        <View style={styles.currentChatUserInfo}>
          <Text style={styles.currentChatUserName}>{currentChatUser?.name}</Text>
          <Text style={styles.currentChatUserStatus}>Online</Text>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Snackbar.show({
                              text: "Comming Soon",
                              duration: Snackbar.LENGTH_SHORT,
                              backgroundColor: customColor.GREEN_70,
                              textColor: customColor.Light,
                            })} style={{ marginLeft: 20 }}>
          <Feather name="phone" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Snackbar.show({
                              text: "Comming Soon",
                              duration: Snackbar.LENGTH_SHORT,
                              backgroundColor: customColor.GREEN_70,
                              textColor: customColor.Light,
                            })} style={{ marginLeft: 20 }}>
          <Icon name="dots-three-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: customColor.PRIMARY_GREEN || '#128C7E',
    height: 60,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentChatUserInfo: {
    justifyContent: 'center',
  },
  currentChatUserName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  currentChatUserStatus: {
    fontSize: 12,
    color: '#e0e0e0',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: "#ccc", // fallback background
  },

});
