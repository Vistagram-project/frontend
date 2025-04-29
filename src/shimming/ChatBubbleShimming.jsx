import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const ChatBubbleShimming = () => {
  const { theme } = useSelector((state) => state.mobile);

  // Create 3 left and 3 right chat bubbles
  const leftBubbles = Array(3).fill(0);
  const rightBubbles = Array(3).fill(0);

  return (
    <View style={styles.mainContainer}>
      {/* Left Bubbles */}
      <View style={styles.leftContainer}>
        {leftBubbles.map((_, index) => (
          <ShimmerPlaceholder
            key={index}
            LinearGradient={LinearGradient}
            style={styles.leftMessageShimmer}
          />
        ))}
      </View>

      {/* Right Bubbles */}
      <View style={styles.rightContainer}>
        {rightBubbles.map((_, index) => (
          <ShimmerPlaceholder
            key={index}
            LinearGradient={LinearGradient}
            style={styles.rightMessageShimmer}
          />
        ))}
      </View>
    </View>
  );
};

export default ChatBubbleShimming;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginHorizontal: 10,
    height: '90%',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 10,
    marginBottom:"50%"
  },
  leftMessageShimmer: {
    width: '70%',
    height: 14,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
  },
  rightMessageShimmer: {
    width: '70%',
    height: 14,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
  },
});
