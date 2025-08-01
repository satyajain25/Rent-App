import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PhoneNumber = () => {
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    console.log('Verify phone number:', country, mobile);
    router.push('/(auth)/verifyOtp'); // 👈 Make sure this screen exists
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-6 pt-10">
            <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-4">
              <Ionicons name="car" size={24} color="white" />
            </View>
            <Text className="text-black text-lg font-semibold mb-8">Qent</Text>

            <Text className="text-3xl font-bold text-gray-900 mb-3">
              Verify Your Phone Number
            </Text>
            <Text className="text-gray-600 text-base leading-6 mb-12">
              Enter the phone number associated with your account and we'll send you an OTP to verify.
            </Text>

            {/* Country Input */}
            <View className="mb-6">
              <TextInput
                className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-white text-base text-gray-900"
                placeholder="Country Code (e.g. +1)"
                placeholderTextColor="#9CA3AF"
                value={country}
                onChangeText={setCountry}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            {/* Mobile Input */}
            <View className="mb-8">
              <TextInput
                className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-white text-base text-gray-900"
                placeholder="Mobile Number"
                placeholderTextColor="#9CA3AF"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                autoCapitalize="none"
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

            {/* Return to Login */}
            <TouchableOpacity
              onPress={handleReturnToSignIn}
              activeOpacity={0.7}
              className="mb-6"
            >
              <Text className="text-gray-600 text-center text-base">
                Return to login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View className="px-6 pb-12">
            <TouchableOpacity onPress={handleCreateAccount} activeOpacity={0.7}>
              <Text className="text-gray-600 text-center text-base">
                Create a New account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumber;
