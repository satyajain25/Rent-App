import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 👈 Add this

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const router = useRouter(); // 👈 Initialize router

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const isValidOtp = otp.every(digit => digit !== '');

  const handleContinue = () => {
    if (isValidOtp) {
      router.push('/(tabs)'); // ✅ Navigate to tabs
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="pt-12 px-5 pb-5">
        <View className="items-start mb-8 mt-9">
          <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-4">
            <Ionicons name="car" size={24} color="white" />
          </View>
          <Text className="text-black text-lg font-semibold">Qent</Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-5 pt-5">
        <Text className="text-2xl font-semibold text-black mb-2">
          Enter verification code
        </Text>
        <Text className="text-sm text-gray-600 mb-10">
          We have sent a Code to: +100*****00
        </Text>

        {/* OTP Input Fields */}
        <View className="flex-row justify-between px-5 mb-10">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              className={`w-16 h-16 bg-white rounded-xl text-center text-xl font-semibold text-black border ${
                focusedIndex === index ? 'border-blue-500' : 'border-gray-200'
              }`}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              keyboardType="number-pad"
              maxLength={1}
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className={`py-4 rounded-3xl items-center mb-5 ${
            isValidOtp ? 'bg-gray-800' : 'bg-gray-400'
          }`}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!isValidOtp}
        >
          <Text className="text-white text-base font-semibold">Continue</Text>
        </TouchableOpacity>

        {/* Resend Option */}
        <View className="flex-row justify-center items-center">
          <Text className="text-sm text-gray-600">Didn't receive the OTP? </Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">Resend.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center pb-8">
        <Text className="text-xs text-gray-400 mb-0.5">Form Message</Text>
        <Text className="text-xs text-gray-400">6930</Text>
      </View>
    </View>
  );
};

export default VerifyOtp;
