import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import chatData from '../utils/chatData.json';
import { useRouter } from 'expo-router';
const ChatScreen = ({ route, navigation }) => {
  // Use a default contact object if route or route.params is undefined
  const { contact } = route?.params || {
    contact: {
      id: 'default_id',
      name: 'Default Name',
      avatar: 'https://example.com/default-avatar.jpg',
      isOnline: false,
    },
  };
const router = useRouter();
  const [messages, setMessages] = useState(chatData.chatMessages[contact.id] || []);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        senderId: 'user',
        message: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        type: 'text'
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate auto-reply
        const autoReply = {
          id: Date.now() + 1,
          senderId: contact.id,
          message: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          type: 'text'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const renderMessage = ({ item }) => {
    if (item.type === 'typing') {
      return (
        <View className="flex-row items-end mb-4 px-4">
          <Image
            source={{ uri: contact.avatar }}
            className="w-8 h-8 rounded-full mr-2"
          />
          <View className="bg-gray-200 rounded-2xl px-4 py-2">
            <Text className="text-gray-600 italic">Typing...</Text>
          </View>
        </View>
      );
    }
    return (
      <View className={`flex-row items-end mb-4 px-4 ${item.isOwn ? 'justify-end' : 'justify-start'}`}>
        {!item.isOwn && (
          <Image
            source={{ uri: contact.avatar }}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}

        <View className={`max-w-[70%] ${item.isOwn ? 'bg-blue-500' : 'bg-gray-200'} rounded-2xl px-4 py-2`}>
          <Text className={`text-sm ${item.isOwn ? 'text-white' : 'text-gray-800'}`}>
            {item.message}
          </Text>
        </View>

        {item.isOwn && (
          <View className="ml-2 justify-end">
            <Text className="text-xs text-gray-400">{item.time}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <TouchableOpacity  onPress={() => router.push('/components/userProfile', )}>
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 mx-4">
          <View className="relative">
            <Image
              source={{ uri: contact.avatar }}
              className="w-10 h-10 rounded-full"
            />
            {contact.isOnline && (
              <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </View>
          <View className="ml-3">
            <Text className="text-base font-semibold text-gray-900">{contact.name}</Text>
            <Text className="text-sm text-green-600">Online</Text>
          </View>
        </View>

        <View className="flex-row">
          <TouchableOpacity className="mr-4">
            <Ionicons name="videocam" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={isTyping ? [...messages, { id: 'typing', type: 'typing' }] : messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="border-t border-gray-200"
      >
        <View className="flex-row items-center px-4 py-3 bg-white">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              placeholder="Type a message..."
              value={inputText}
              onChangeText={setInputText}
              className="flex-1 text-base text-gray-700"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="happy" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSend}
            className="ml-3 bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
