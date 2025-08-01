import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Benjamin Jack',
    email: 'benjamin.jack@gmail.com',
    surname: 'Jack',
    phone: '+1000000000',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const ProfileMenuItem = ({ icon, title, onPress, showArrow = true }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 px-4 bg-white border-b border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-gray-900 text-base">{title}</Text>
      </View>
      {showArrow && (
        <Text className="text-gray-400 text-lg">›</Text>
      )}
    </TouchableOpacity>
  );

  const EditProfileScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => setIsEditing(false)}>
          <Text className="text-gray-700 text-2xl">‹</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Edit Profile</Text>
        <TouchableOpacity>
          <Text className="text-gray-700 text-xl">⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Image */}
        <View className="items-center py-8 bg-white">
          <View className="relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-800 rounded-full items-center justify-center">
              <Text className="text-white text-sm">✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View className="bg-white mx-4 rounded-lg shadow-sm border border-gray-200">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-sm text-gray-600 mb-2">Surname</Text>
            <TextInput
              value={userInfo.surname}
              onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
              className="text-base text-gray-900 py-2"
              placeholder="Enter surname"
            />
          </View>

          <View className="p-4 border-b border-gray-200">
            <Text className="text-sm text-gray-600 mb-2">Jack</Text>
            <TextInput
              value={userInfo.name.split(' ')[0]}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: `${text} ${userInfo.surname}` })}
              className="text-base text-gray-900 py-2"
              placeholder="Enter first name"
            />
          </View>

          <View className="p-4 border-b border-gray-200">
            <Text className="text-sm text-gray-600 mb-2">Email</Text>
            <TextInput
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
              className="text-base text-gray-900 py-2"
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View className="p-4">
            <Text className="text-sm text-gray-600 mb-2">Phone</Text>
            <TextInput
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
              className="text-base text-gray-900 py-2"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="mx-4 mt-6 bg-gray-800 rounded-lg py-4 items-center"
          onPress={handleSave}
        >
          <Text className="text-white text-base font-semibold">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  const MainProfileScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        {/* <TouchableOpacity>
          <Text className="text-gray-700 text-2xl">‹</Text>
        </TouchableOpacity> */}
        <Text className="text-lg font-semibold text-gray-900">Profile</Text>
        {/* <TouchableOpacity>
          <Text className="text-gray-700 text-xl">⋮</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-8 bg-white border-b border-gray-200">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
            className="w-20 h-20 rounded-full mb-3"
          />
          <Text className="text-xl font-semibold text-gray-900">{userInfo.name}</Text>
          <Text className="text-sm text-gray-600">{userInfo.email}</Text>
          <TouchableOpacity 
            className="mt-3 px-4 py-2 bg-gray-100 rounded-lg"
            onPress={() => setIsEditing(true)}
          >
            <Text className="text-sm text-gray-700">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View className="mt-6">
          <Text className="text-sm font-medium text-gray-700 px-4 pb-2">General</Text>
          <View className="bg-white">
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-blue-600 text-xs">✂</Text>
              </View>}
              title="Favorite Cuts"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center">
                <Text className="text-green-600 text-xs">📍</Text>
              </View>}
              title="Previous Visits"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-red-100 rounded-full items-center justify-center">
                <Text className="text-red-600 text-xs">🔔</Text>
              </View>}
              title="Notifications"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-purple-100 rounded-full items-center justify-center">
                <Text className="text-purple-600 text-xs">🤝</Text>
              </View>}
              title="Connected to GENY Partnerships"
            />
          </View>
        </View>

        {/* Support Section */}
        <View className="mt-6">
          <Text className="text-sm font-medium text-gray-700 px-4 pb-2">Support</Text>
          <View className="bg-white">
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">⚙️</Text>
              </View>}
              title="Settings"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">🌐</Text>
              </View>}
              title="Languages"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">👥</Text>
              </View>}
              title="Invite Friends"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">📋</Text>
              </View>}
              title="Privacy policy"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">❓</Text>
              </View>}
              title="Help Support"
            />
            <ProfileMenuItem
              icon={<View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-gray-600 text-xs">🚪</Text>
              </View>}
              title="Log out"
              showArrow={false}
            />
          </View>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );

  return isEditing ? <EditProfileScreen /> : <MainProfileScreen />;
};

export default ProfileScreen;