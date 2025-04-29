import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { getThemeColor } from '../helper';
import { useSelector } from 'react-redux';

const UserCardShimmer = () => {
  const { theme } = useSelector((state) => state.mobile);
  return (
    <View style={[styles.mainContainer , {backgroundColor:getThemeColor(theme)}]}>
      {/* Profile Image and Text Container */}
      <View style={styles.subContainer}>

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.profileImgShimmer}
        />

        <View style={styles.textContainer}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.userNameShimmer}
          />
          <View style={{ height: 8 }} />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.lastMessageShimmer}
          />
        </View>
      </View>
    </View>
  );
};

export default UserCardShimmer;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    borderRadius: 7,
    marginHorizontal: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImgShimmer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  userNameShimmer: {
    width: '70%',
    height: 18,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  lastMessageShimmer: {
    width: '50%',
    height: 14,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
});
