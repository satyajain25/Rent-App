import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, User, Mail, Phone, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
const BookingDetails = () => {
  const [bookWithDriver, setBookWithDriver] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male');
  const [selectedDuration, setSelectedDuration] = useState('Day');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();
  const ProgressStep = ({ active, completed, title }) => (
    <View className="flex-1 items-center">
      <View className={`w-4 h-4 rounded-full ${completed ? 'bg-black' : active ? 'bg-black' : 'bg-gray-300'}`} />
      <Text className={`text-xs mt-1 ${active || completed ? 'text-black' : 'text-gray-500'}`}>{title}</Text>
    </View>
  );

  const ProgressLine = ({ completed }) => (
    <View className={`flex-1 h-0.5 ${completed ? 'bg-black' : 'bg-gray-300'} mx-2 mt-2`} />
  );
  const handleBack = () => {
  router.push('/screens/CarDetails');
};


  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity className="p-2" onPress={handleBack}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Booking Details</Text>
        <TouchableOpacity>
          <MoreHorizontal size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Progress Steps */}
        <View className="flex-row items-center mb-8">
          <ProgressStep active={true} completed={true} title="Booking details" />
          <ProgressLine completed={true} />
          <ProgressStep active={false} completed={false} title="Payment methods" />
          <ProgressLine completed={false} />
          <ProgressStep active={false} completed={false} title="confirmation" />
        </View>

        {/* Book with driver toggle */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-base font-medium">Book with driver</Text>
              <Text className="text-sm text-gray-500">Don't have a driver? book with driver.</Text>
            </View>
            <TouchableOpacity
              onPress={() => setBookWithDriver(!bookWithDriver)}
              className={`w-12 h-7 rounded-full p-1 ${bookWithDriver ? 'bg-black' : 'bg-gray-300'}`}
            >
              <View className={`w-5 h-5 rounded-full bg-white transition-transform ${bookWithDriver ? 'translate-x-5' : 'translate-x-0'}`} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-4 mb-6">
          {/* Full Name */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center space-x-3">
              <User size={20} color="#9ca3af" />
              <TextInput
                placeholder="Full Name*"
                value={fullName}
                onChangeText={setFullName}
                className="flex-1 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Email */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center space-x-3">
              <Mail size={20} color="#9ca3af" />
              <TextInput
                placeholder="Email Address*"
                value={email}
                onChangeText={setEmail}
                className="flex-1 text-base"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Contact */}
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center space-x-3">
              <Phone size={20} color="#9ca3af" />
              <TextInput
                placeholder="Contact*"
                value={contact}
                onChangeText={setContact}
                className="flex-1 text-base"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Gender Selection */}
        <View className="mb-6">
          <Text className="text-base font-medium mb-3">Gender</Text>
          <View className="flex-row space-x-3">
            {['Male', 'Female', 'Others'].map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => setSelectedGender(gender)}
                className={`flex-1 py-3 px-4 rounded-xl border ${
                  selectedGender === gender
                    ? 'bg-black border-black'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-center ${
                    selectedGender === gender ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rental Date & Time */}
        <View className="mb-6">
          <Text className="text-base font-medium mb-3">Rental Date & Time</Text>
          
          {/* Duration Selection */}
          <View className="flex-row space-x-2 mb-4">
            {['Hour', 'Day', 'Weekly', 'Monthly'].map((duration) => (
              <TouchableOpacity
                key={duration}
                onPress={() => setSelectedDuration(duration)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDuration === duration
                    ? 'bg-black'
                    : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedDuration === duration ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Selection */}
          <View className="flex-row space-x-3 mb-4">
            <View className="flex-1 bg-white rounded-xl p-4">
              <Text className="text-sm text-gray-500 mb-1">Pick up Date</Text>
              <Text className="text-base">19 January 2024</Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-4">
              <Text className="text-sm text-gray-500 mb-1">Return Date</Text>
              <Text className="text-base">25 January 2024</Text>
            </View>
          </View>
        </View>

        {/* Car Location */}
        <View className="mb-8">
          <Text className="text-base font-medium mb-3">Car Location</Text>
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center space-x-3">
              <MapPin size={20} color="#9ca3af" />
              <Text className="text-base text-gray-700">Shops Or Chicago 60612 Usa</Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing for button */}
        <View className="h-20" />
      </ScrollView>

      {/* Pay Now Button */}
      <View className="px-4 pb-6 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-black rounded-xl py-4 mt-4"   onPress={() => router.push('/screens/PaymentMethod')} >
          <Text className="text-white text-center text-lg font-semibold">$1400 Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingDetails;