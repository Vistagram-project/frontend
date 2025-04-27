import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { textConstant } from '../../redux/constant/globalTextConstant';
import customColor from '../../../android/app/src/utils/customColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTextColor, getThemeColor } from '../../helper';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const ChatScreen = ({ socket }) => {
  const { userDetails } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.mobile);
  const { currentChatUser } = useSelector((state) => state.chat);
  console.log("currentChatUser =>", currentChatUser)
  const [message, setMessage] = useState('');
  const [msgArr, setMsgArr] = useState([]);
  const flatListRef = useRef(null);
  const isDark = theme === 'dark';
  const userId = userDetails?._id;

  // ⬇️ Connect socket and listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', ({ from, message }) => {
      console.log('📩 Received message from', from, ':', message);

      setMsgArr((prev) => [
        ...prev,
        {
          senderId: from,
          receiverId: userDetails._id,
          msg: message,
        }
      ]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
  }, [socket, userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const tempMessage = {
        senderId: userDetails?._id,
        receiverId: currentChatUser?._id,
        msg: message,
      };

      // ➡️ Add message locally
      setMsgArr((prev) => [...prev, tempMessage]);

      // ➡️ Emit to server
      socket.emit('send-message', {
        from: userId,
        to: currentChatUser?._id,
        message: message,
      });

      console.log('📤 Sent message:', message);
      setMessage('');

      // Auto scroll
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getMessageTextColor = (isDark, isSender) => {
    if (isDark) {
      return isSender ? customColor.Dark : customColor.GREY_10;
    } else {
      return isSender ? customColor.PRUSSIAN_90 : customColor.GREY_10;
    }
  };

  const renderItem = ({ item }) => {
    const isSender = item.senderId === userDetails?._id;
    return (
      <View
        style={[
          styles.messageBubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: getMessageTextColor(isDark, isSender) },
          ]}
        >
          {item.msg}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={isDark ? ['#0F2027', '#203A43', '#2C5364'] : [customColor.GREY_20, '#f2f2f2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={msgArr}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chatBody}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder={textConstant.type_your_message}
            placeholderTextColor={customColor.GREY_40}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#1e1e1e' : '#fff',
                color: isDark ? '#fff' : '#000',
                borderColor: isDark ? '#333' : '#ccc',
              },
            ]}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { backgroundColor: getThemeColor(theme) },
            ]}
          >
            <Ionicons
              name={isDark ? 'send' : 'send-outline'}
              size={22}
              color={getTextColor(theme)}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatBody: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
  },
  senderBubble: {
    backgroundColor: customColor.GREY_30,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  receiverBubble: {
    backgroundColor: customColor.PRUSSIAN_80,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
});
