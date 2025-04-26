import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react'
import customColor from '../../../android/app/src/utils/customColor'
import UserCard from '../../components/chatCompo/UserCard'
import { useDispatch, useSelector } from 'react-redux'

const UsersScreen = ({navigation}) => {
 const {theme} = useSelector((state)=> state.mobile);
 const {getAllUsers} = useSelector((state)=> state.chat);
 const dispatch = useDispatch();

 const handlePress = (user) => {
  navigation.navigate('ChatScreen', { user });
  dispatch({type:"SET_CURRENT_CHAT_USER" , payload: user});
};

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme === 'dark' ? customColor.Dark : customColor.Light }]}>
    <FlatList
      data={getAllUsers}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <UserCard
          userName={item.name}
          lastMessage={item.lastMessage}
          profileImg={item.profileImg}
          onPress={() => handlePress(item)}
        />
      )}
    />
  </View>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
      },
})