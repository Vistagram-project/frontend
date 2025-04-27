import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react'
import UserCard from '../../components/chatCompo/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import LoadingScreen from '../Loading';
import { getThemeColor } from '../../helper';

const UsersScreen = ({navigation}) => {
  const dispatch = useDispatch();
 const {theme} = useSelector((state)=> state.mobile);
 const {getAllUsers , chatReducer_loading} = useSelector((state)=> state.chat);
 
 const handlePress = (user) => {
  navigation.navigate('ChatScreen', { user });
  dispatch({type:"SET_CURRENT_CHAT_USER" , payload: user});
  };

  console.log("chatReducer_loading =>", chatReducer_loading)

  return (

    <>
    {chatReducer_loading? <LoadingScreen/>:(
      <View style={[styles.mainContainer, { backgroundColor: getThemeColor(theme) }]}>
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
    )}
    
    </>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
      },
})