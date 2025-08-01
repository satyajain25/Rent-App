import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Star, MapPin, Download, Share, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PaymentConfirm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
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
  router.push('/screens/PaymentMethod');
};

  const InfoRow = ({ label, value, isLast = false }) => (
    <View className={`flex-row justify-between items-center ${!isLast ? 'mb-3' : ''}`}>
      <Text className="text-sm text-gray-600">{label}</Text>
      <Text className="text-sm font-medium">{value}</Text>
    </View>
  );

  if (showSuccess) {
    return (
      <View className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
         
          <Text className="text-lg font-semibold">Payment Status</Text>
          <TouchableOpacity>
            <MoreHorizontal size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-4 pt-8">
          {/* Success Animation */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-4 relative">
              <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center">
                <Check size={32} color="white" />
              </View>
              {/* Animated dots */}
              <View className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full" />
              <View className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-300 rounded-full" />
              <View className="absolute top-2 -left-4 w-2 h-2 bg-green-400 rounded-full" />
              <View className="absolute -top-4 left-2 w-2 h-2 bg-green-300 rounded-full" />
            </View>
            <Text className="text-xl font-semibold mb-2">Payment successful</Text>
            <Text className="text-gray-600 text-center">Your Car rent Booking has been successfully</Text>
          </View>

          {/* Booking Information */}
          <View className="bg-white rounded-xl p-4 mb-6">
            <Text className="text-base font-semibold mb-4">Booking Information</Text>
            <InfoRow label="Car Model" value="Tesla Model s" />
            <InfoRow label="Rental Time" value="15Jan24 - 22Jan'24" />
            <InfoRow label="Name" value="Benjamin Jack" isLast={true} />
          </View>

          {/* Transaction Details */}
          <View className="bg-white rounded-xl p-4 mb-6">
            <Text className="text-base font-semibold mb-4">Transaction detail</Text>
            <InfoRow label="Transaction ID" value="#T0001230041" />
            <InfoRow label="Transaction Date" value="01 Jan2024 -12:30 PM" />
            <InfoRow label="Payment Method" value="123 ••• ••• ••••235" />
            <InfoRow label="Amount" value="$1400" />
            <InfoRow label="Service fee" value="$15" />
            <InfoRow label="Tax" value="$0" isLast={true} />
          </View>

          {/* Total Amount */}
          <View className="bg-white rounded-xl p-4 mb-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-semibold">Total amount</Text>
              <Text className="text-lg font-bold">$1415</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3 mb-6">
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl py-3 flex-row items-center justify-center space-x-2">
              <Download size={20} color="#000" />
              <Text className="font-medium">Download Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl py-3 flex-row items-center justify-center space-x-2">
              <Share size={20} color="#000" />
              <Text className="font-medium">Share Your Receipt</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View className="h-20" />
        </ScrollView>

        {/* Back to Home Button */}
        <View className="px-4 pb-6 bg-white border-t border-gray-200">
          <TouchableOpacity className="bg-black rounded-xl py-4 mt-4"       onPress={() => router.push('/(tabs)')}>
            <Text className="text-white text-center text-lg font-semibold">Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity className="p-2" onPress={handleBack}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Confirmation</Text>
        <TouchableOpacity>
          <MoreHorizontal size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Progress Steps */}
        <View className="flex-row items-center mb-8">
          <ProgressStep active={false} completed={true} title="Booking details" />
          <ProgressLine completed={true} />
          <ProgressStep active={false} completed={true} title="Payment methods" />
          <ProgressLine completed={true} />
          <ProgressStep active={true} completed={true} title="confirmation" />
        </View>

        {/* Car Image and Details */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <View className="flex-row items-center space-x-4">
            <View className="w-20 h-16 bg-gray-100 rounded-lg items-center justify-center">
              <View className="w-16 h-12 bg-gray-800 rounded-lg" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold">Tesla Model S</Text>
              <Text className="text-sm text-gray-600">A car with high specs that are rented at an affordable price.</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-sm font-medium">5.0</Text>
                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                <Text className="text-sm text-gray-500 ml-1">(15 reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Booking Information */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-base font-semibold mb-4">Booking Information</Text>
          <InfoRow label="Booking ID" value="00821" />
          <InfoRow label="Name" value="Benjamin Jack" />
          <InfoRow label="Pick up Date" value="15 Jan 2024, 10:30 am" />
          <InfoRow label="Return Date" value="22 Jan 2024, 10:30 am" />
          <InfoRow label="Location" value="Shops Or Chicago 0012 Usa" isLast={true} />
        </View>

        {/* Payment Details */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-base font-semibold mb-4">Payment</Text>
          <InfoRow label="Trip ID" value="#141mnsv555405" />
          <InfoRow label="Amount" value="$1400" />
          <InfoRow label="Service fee" value="$15" />
          <InfoRow label="Total amount" value="$1415" />
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-sm text-gray-600">Payment with</Text>
            <View className="flex-row space-x-1">
              <View className="w-4 h-3 bg-red-500 rounded-sm" />
              <View className="w-4 h-3 bg-yellow-500 rounded-sm" />
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>

      {/* Confirm Button */}
      <View className="px-4 pb-6 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="bg-black rounded-xl py-4 mt-4"
          onPress={() => setShowSuccess(true)}
        >
          <Text className="text-white text-center text-lg font-semibold">Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentConfirm;