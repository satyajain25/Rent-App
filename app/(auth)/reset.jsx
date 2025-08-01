import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
const Reset = () => {
  const [email, setEmail] = useState('');
  const router = useRouter(); 

  const handleContinue = () => {
    console.log('Reset password for:', email);
  };

  const handleReturnToSignIn = () => {
    router.push('/(auth)/login');
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/signup'); 
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
         <View className="items-start mb-8 mt-9">
              <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-4 ">
                <Ionicons name="car" size={24} color="white" />
              </View>
              <Text className="text-black text-lg font-semibold">Qent</Text>
            </View>

      
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 pt-20">
        <Text className="text-3xl font-bold text-gray-900 mb-3">
          Reset your password
        </Text>
        <Text className="text-gray-600 text-base leading-6 mb-12">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </Text>

        {/* Email Input */}
        <View className="mb-8">
          <TextInput
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-white text-base text-gray-900"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className="w-full bg-gray-800 py-4 rounded-xl mb-6"
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Return to Sign In */}
        <TouchableOpacity
          onPress={handleReturnToSignIn}
          activeOpacity={0.7}
          className="mb-9"
        >
          <Text className="text-gray-600 text-center text-base">
            Return to login
          </Text>
        </TouchableOpacity>
      </View>
 <View className="px-6 pb-8 ">
        <TouchableOpacity
          onPress={handleCreateAccount}
          activeOpacity={0.7}
        >
          <Text className="text-gray-600 text-center text-base">
            Create a New account
          </Text>
        </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
};

export default Reset;
