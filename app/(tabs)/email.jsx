import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import chatData from '../utils/chatData.json';
import { useRouter } from 'expo-router';
const email = ({ navigation }) => {

  const router = useRouter();
  const userData = {
    id: 'user',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Love traveling and exploring new places! 🌍✈️',
    joinDate: 'March 2023',
    totalChats: 28,
    totalCalls: 15,
    storiesShared: 42
  };



  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' }
      ]
    );
  };

  const ProfileSection = ({ title, children }) => (
    <View className="bg-white mx-4 mb-4 rounded-2xl shadow-sm">
      <Text className="text-lg font-semibold text-gray-900 px-4 pt-4 pb-2">{title}</Text>
      {children}
    </View>
  );

  const ProfileItem = ({ icon, title, subtitle, onPress, rightComponent, showArrow = true }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-3 border-b border-gray-50 last:border-b-0"
    >
      <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
        <Ionicons name={icon} size={20} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />)}
    </TouchableOpacity>
  );

  const StatsCard = ({ number, label, icon }) => (
    <View className="bg-white rounded-2xl p-4 items-center shadow-sm flex-1 mx-1">
      <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
        <Ionicons name={icon} size={24} color="#3B82F6" />
      </View>
      <Text className="text-2xl font-bold text-gray-900">{number}</Text>
      <Text className="text-sm text-gray-500">{label}</Text>
    </View>
  );

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
      onPress={() => router.push('/components/ChatScreen', { contact: item })}
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">

     <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-900">Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Header */}
        <View className="bg-white mx-4 mt-4 mb-4 rounded-2xl shadow-sm">
          <View className="items-center py-6">
            <View className="relative">
              <Image
                source={{ uri: userData.avatar }}
                className="w-24 h-24 rounded-full"
              />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mt-4">{userData.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{userData.email}</Text>
            <Text className="text-sm text-gray-600 mt-2 px-6 text-center">{userData.bio}</Text>
            <Text className="text-xs text-gray-400 mt-2">Member since {userData.joinDate}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View className="flex-row mx-4 mb-4">
          <StatsCard number={userData.totalChats} label="Chats" icon="chatbubbles" />
          <StatsCard number={userData.totalCalls} label="Calls" icon="call" />
          <StatsCard number={userData.storiesShared} label="Stories" icon="camera" />
        </View>

        {/* Stories Section */}
        <ProfileSection title="Stories">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={chatData.storyUsers}
              renderItem={renderStoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </ScrollView>
        </ProfileSection>

        {/* Recent Chats Section */}
        <ProfileSection title="Recent Chats">
          <FlatList
            data={chatData.contacts}
            renderItem={renderContactItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </ProfileSection>

        {/* Logout */}
        <View className="bg-white mx-4 mb-8 rounded-2xl shadow-sm">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-4 py-4"
          >
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <Text className="text-base font-medium text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default email;
