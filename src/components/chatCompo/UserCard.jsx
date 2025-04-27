import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import customColor from '../../../android/app/src/utils/customColor';

const UserCard = ({ userName = "User Name", lastMessage = "Last message", profileImg = "" ,  onPress }) => {
  const { theme } = useSelector((state) => state.mobile);


  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.mainContainer, { backgroundColor: theme === 'dark' ? customColor.Dark : customColor.Light }]}>
      <View style={styles.subContainer}>
        {/* Profile Image Section */}
        <View style={styles.profileImgContainer}>
          <Image
            source={{
              uri: profileImg || "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }}
            style={styles.profileImg}
          />
        </View>

        {/* User Name and Last Message */}
        <View style={styles.textContainer}>
          <Text style={[styles.userName, { color: theme === 'dark' ? customColor.Light : customColor.GREY_80 }]}>{userName}</Text>
          <Text style={[styles.lastMessage, { color: theme === 'dark' ? customColor.GREY_40 : customColor.GREY_50 }]}>{lastMessage}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default UserCard

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    marginTop: 5,
  },
});