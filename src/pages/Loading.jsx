import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import customColor from '../../android/app/src/utils/customColor';
import { getThemeColor } from '../helper';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
  const {theme} = useSelector(state => state.mobile)
  return (
    <View style={[styles.container , {backgroundColor:getThemeColor(theme)}]}>
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
  },
});
