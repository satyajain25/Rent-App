import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import chatData from '../utils/chatData.json';

const ChatListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(chatData.contacts);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = chatData.contacts.filter(contact =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    navigation.navigate('ChatScreen', { contact });
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity className="items-center mr-4">
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-14 h-14 rounded-full"
        />
        {item.hasStory && (
          <View className="absolute -inset-0.5 rounded-full border-2 border-blue-500" />
        )}
        {item.isOwn && (
          <View className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
            <Ionicons name="add" size={12} color="white" />
          </View>
        )}
      </View>
      <Text className="text-xs mt-1 max-w-14 text-center text-gray-700" numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleContactPress(item)}
      className="flex-row items-center py-3 px-4 border-b border-gray-100"
    >
      <View className="relative">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full"
        />
        {item.isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>
      
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      
      <View className="items-end">
        <Text className="text-xs text-gray-400">{item.time}</Text>
        {item.unreadCount > 0 && (
          <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center mt-1">
            <Text className="text-white text-xs">{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Chats</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 bg-gray-50">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search your chats ..."
            value={searchText}
            onChangeText={handleSearch}
            className="flex-1 ml-3 text-gray-700"
          />
        </View>
      </View>

      {/* Stories Section */}
      <View className="px-4 py-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={chatData.storyUsers}
            renderItem={renderStoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
          />
        </ScrollView>
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      />

      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center py-3 bg-gray-900 mx-4 mb-4 rounded-full">
        <TouchableOpacity className="items-center">
          <Ionicons name="chatbubbles" size={24} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="search" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="mail" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="notifications" size={24} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;