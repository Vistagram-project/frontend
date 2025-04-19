import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import customColor from '../../android/app/src/utils/customColor';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={customColor.GREY_50} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // optional
  },
});
