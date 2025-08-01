import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, CreditCard, ChevronDown, Check, Copy } from 'lucide-react-native';
import { useRouter } from 'expo-router';
const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
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
  router.push('/screens/BookingDetails');
};

  const PaymentOption = ({ id, title, selected, onPress, icon = null }) => (
    <TouchableOpacity
      onPress={() => onPress(id)}
      className={`bg-white rounded-xl p-4 mb-3 border ${
        selected ? 'border-black' : 'border-gray-200'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          {icon}
          <Text className="text-base">{title}</Text>
        </View>
        <View className={`w-5 h-5 rounded-full border-2 ${
          selected ? 'border-black bg-black' : 'border-gray-300'
        } items-center justify-center`}>
          {selected && <Check size={12} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
           <TouchableOpacity className="p-2" onPress={handleBack}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Payment methods</Text>
        <TouchableOpacity>
          <MoreHorizontal size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Progress Steps */}
        <View className="flex-row items-center mb-8">
          <ProgressStep active={false} completed={true} title="Booking details" />
          <ProgressLine completed={true} />
          <ProgressStep active={true} completed={true} title="Payment methods" />
          <ProgressLine completed={false} />
          <ProgressStep active={false} completed={false} title="confirmation" />
        </View>

        {/* Credit Card Display */}
        <View className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <View className="absolute top-4 right-4">
            <Text className="text-white text-lg font-bold">VISA</Text>
          </View>
          <View className="absolute top-4 left-4">
            <View className="flex-row space-x-2">
              <View className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
              <View className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-2" />
            </View>
          </View>
          
          <View className="mt-8">
            <Text className="text-white text-sm mb-2">BANKNAME_JACK</Text>
            <Text className="text-white text-xs mb-4">Expire: 10/5/2028</Text>
            <View className="flex-row space-x-4">
              <Text className="text-white text-lg font-mono">5656</Text>
              <Text className="text-white text-lg font-mono">5656</Text>
              <Text className="text-white text-lg font-mono">5656</Text>
              <Text className="text-white text-lg font-mono">5656</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Selection */}
        <Text className="text-base font-medium mb-4">Select payment method</Text>
        
        <PaymentOption
          id="cash"
          title="Cash payment"
          selected={selectedPayment === 'cash'}
          onPress={setSelectedPayment}
          icon={<CreditCard size={20} color="#9ca3af" />}
        />

        {/* Card Information */}
        <Text className="text-base font-medium mb-4 mt-6">Card information</Text>
        
        <View className="space-y-4 mb-6">
          <View className="bg-white rounded-xl p-4">
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              className="text-base"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="bg-white rounded-xl p-4">
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              className="text-base"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
            />
          </View>

          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <TextInput
                placeholder="Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                className="text-base flex-1"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
              <View className="flex-row space-x-2">
                <View className="w-6 h-4 bg-red-500 rounded-sm" />
                <View className="w-6 h-4 bg-blue-500 rounded-sm" />
                <View className="w-6 h-4 bg-yellow-500 rounded-sm" />
                <View className="w-6 h-4 bg-green-500 rounded-sm" />
              </View>
            </View>
          </View>

          <View className="flex-row space-x-3">
            <View className="flex-1 bg-white rounded-xl p-4">
              <TextInput
                placeholder="MM / YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                className="text-base"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1 bg-white rounded-xl p-4">
              <View className="flex-row items-center justify-between">
                <TextInput
                  placeholder="CVC"
                  value={cvc}
                  onChangeText={setCvc}
                  className="text-base flex-1"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
                <Copy size={16} color="#9ca3af" />
              </View>
            </View>
          </View>
        </View>

        {/* Country Selection */}
        <Text className="text-base font-medium mb-4">Country or region</Text>
        <View className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-base">United States</Text>
            <ChevronDown size={20} color="#9ca3af" />
          </View>
        </View>

        {/* ZIP Code */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <TextInput
            placeholder="ZIP"
            value={zipCode}
            onChangeText={setZipCode}
            className="text-base"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
          />
        </View>

        {/* Terms Agreement */}
        <View className="flex-row items-center space-x-3 mb-6">
          <TouchableOpacity
            onPress={() => setAgreeTerms(!agreeTerms)}
            className={`w-5 h-5 rounded border-2 ${
              agreeTerms ? 'border-black bg-black' : 'border-gray-300'
            } items-center justify-center`}
          >
            {agreeTerms && <Check size={12} color="white" />}
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">Terms & conditions</Text>
        </View>

        {/* Alternative Payment Methods */}
        <View className="space-y-3 mb-6">
          <TouchableOpacity className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-base">Pay with card.Or</Text>
              <ChevronDown size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center space-x-3">
              <View className="w-6 h-6 bg-black rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">A</Text>
              </View>
              <Text className="text-base">Apple pay</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center space-x-3">
              <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">G</Text>
              </View>
              <Text className="text-base">Google Pay</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>

      {/* Continue Button */}
      <View className="px-4 pb-6 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-black rounded-xl py-4 mt-4" onPress={() => router.push('/screens/PaymentConfirm')} >
          <Text className="text-white text-center text-lg font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;