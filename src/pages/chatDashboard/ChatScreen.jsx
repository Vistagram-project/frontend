import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { textConstant } from '../../redux/constant/globalTextConstant';
import customColor from '../../../android/app/src/utils/customColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTextColor, getThemeColor } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { fetchChatHistory } from '../../redux/action/chatAction';
import ChatBubbleShimming from '../../shimming/ChatBubbleShimming';

const ChatScreen = ({ socket }) => {
  const { userDetails } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.mobile);
  const { currentChatUser, currentChatUserHistoryMessage , chatReducer_loading } = useSelector((state) => state.chat);

  const [message, setMessage] = useState('');
  const [msgArr, setMsgArr] = useState([]);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  const isDark = theme === 'dark';
  const userId = userDetails?._id;

  useEffect(() => {
    if (currentChatUser?._id) {
      dispatch(fetchChatHistory(userId, currentChatUser._id));
    }
  }, [currentChatUser, dispatch, userId]);

  useEffect(() => {
    if (currentChatUserHistoryMessage?.length) {
      setMsgArr(currentChatUserHistoryMessage);
      scrollToBottom();
    }
  }, [currentChatUserHistoryMessage]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = ({ from, message }) => {
      setMsgArr((prev) => [
        ...prev,
        {
          senderId: from,
          receiverId: userDetails._id,
          message: message,
          timestamp: new Date().toISOString(),
        }
      ]);
      scrollToBottom();
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [socket, userDetails?._id]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId: currentChatUser?._id,
        message: message,
        timestamp: new Date().toISOString(),
      };

      setMsgArr((prev) => [...prev, newMessage]);

      socket.emit('send-message', {
        from: userId,
        to: currentChatUser?._id,
        message: message,
      });

      setMessage('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getMessageTextColor = (isSender) => {
    if (isDark) {
      return isSender ? customColor.Dark : customColor.GREY_10;
    } else {
      return isSender ? customColor.PRUSSIAN_90 : customColor.GREY_10;
    }
  };

  const formatTimestampToTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDateHeader = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);

    if (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    ) {
      return 'Today';
    }

    const options = { weekday: 'long' }; // like 'Friday'
    return date.toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item, index }) => {
    const isSender = item.senderId === userId;
    const showDate =
      index === 0 ||
      formatDateHeader(item.timestamp) !== formatDateHeader(msgArr[index - 1].timestamp);

    return (
      <>
        {showDate && (
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <Text style={{ color: getTextColor(theme), fontWeight: 'bold' }}>
              {formatDateHeader(item.timestamp)}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              { color: getMessageTextColor(isSender) },
            ]}
          >
            {item.message}
          </Text>
          <Text style={[styles.chatTiming, { color: getMessageTextColor(theme) }]}>
            {formatTimestampToTime(item.timestamp)}
          </Text>
        </View>
      </>
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
        {
          chatReducer_loading ? <ChatBubbleShimming/> :(
            <FlatList
          ref={flatListRef}
          data={msgArr}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={styles.chatBody}
          onContentSizeChange={scrollToBottom}
        />
          )
        }
        

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
            <Ionicons name="send" size={22} color={getTextColor(theme)} />
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
    fontSize: 14,
    fontFamily: "Poppins",
    paddingRight: 50,
  },
  chatTiming: {
    fontSize: 10,
    textAlign: 'right',
  },
});
