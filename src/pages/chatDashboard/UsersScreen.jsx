import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react'
import UserCard from '../../components/chatCompo/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { getThemeColor } from '../../helper';
import UserCardShimmer from '../../shimming/UserCardShimmer';
const UsersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.mobile);
  const { getAllUsers, chatReducer_loading } = useSelector((state) => state.chat);

  const handlePress = (user) => {
    navigation.navigate('ChatScreen', { user });
    dispatch({ type: "SET_CURRENT_CHAT_USER", payload: user });
  };


  return (
    <>
      <View style={[styles.mainContainer, { backgroundColor: getThemeColor(theme) }]}>
        {
           chatReducer_loading ? (Array.from({ length: 5 }).map((_, index) => <UserCardShimmer key={index} />)) : (
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
          )
        }
      </View>
    </>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
})