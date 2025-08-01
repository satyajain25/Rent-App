import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CarDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const carData = {
    id: params.carId || '1',
    name: params.carName || 'Tesla Model S',
    image:
      params.carImage ||
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    price: params.carPrice || '230',
    priceType: params.carPriceType || 'day',
    location: params.carLocation || 'New York',
    seats: params.carSeats || '5',
    rating: params.carRating || '5.0',
  };

const handleBack = () => {
  router.push('/(tabs)');
};


  const handleBookNow = () => {
    router.push({
      pathname: './BookingDetails',
      params: {
        carId: carData.id,
        carName: carData.name,
        carPrice: carData.price,
        carPriceType: carData.priceType,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity className="p-2" onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Car Details</Text>
        <TouchableOpacity className="p-2">
          <Feather name="more-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Car Image Section */}
        <View className="bg-white px-4 py-6">
          <View className="relative">
            <Image
              source={{ uri: carData.image }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm">
              <Feather name="heart" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Pagination dots */}
          <View className="flex-row justify-center mt-4 space-x-2">
            <View className="w-2 h-2 bg-gray-800 rounded-full" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
          </View>
        </View>

        {/* Car Info Section */}
        <View className="bg-white mt-2 px-4 py-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">{carData.name}</Text>
              <Text className="text-gray-600 mt-1">
                A car with high specs that are rented at an affordable price.
              </Text>
              <View className="flex-row items-center mt-2">
                <Text className="text-2xl font-bold text-gray-900">${carData.price}/</Text>
                <Text className="text-lg text-gray-600">{carData.priceType}</Text>
              </View>
            </View>
            <View className="items-center ml-4">
              <View className="flex-row items-center">
                <Feather name="star" size={16} color="#fbbf24" />
                <Text className="text-lg font-bold ml-1">{carData.rating}</Text>
              </View>
              <Text className="text-gray-500 text-sm">(10 reviews)</Text>
            </View>
          </View>

          {/* Location */}
          <View className="flex-row items-center mt-3">
            <Text className="text-gray-600">📍 {carData.location}</Text>
          </View>

          {/* Host Info */}
          <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108755-2616b9963838?w=40&h=40&fit=crop&crop=face',
                }}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3">
                <Text className="font-semibold text-gray-900">Hela Quintin</Text>
                <View className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
              </View>
            </View>
            <View className="flex-row space-x-3">
              <TouchableOpacity className="p-3 bg-gray-100 rounded-full">
                <Feather name="phone" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity className="p-3 bg-gray-100 rounded-full">
                <Feather name="message-circle" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Car Features Section */}
        <View className="bg-white mt-2 px-4 py-5">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Car features</Text>

          <View className="flex-row flex-wrap">
            {/* Row 1 */}
            <Feature
              icon={<Feather name="users" size={24} color="#666" />}
              title="Capacity"
              value={`${carData.seats} Seats`}
            />
            <Feature
              icon={<Feather name="zap" size={24} color="#666" />}
              title="Engine Out"
              value="670 HP"
            />
            <Feature
              icon={<MaterialCommunityIcons name="speedometer" size={24} color="#666" />}
              title="Max Speed"
              value="250kmh"
            />

            {/* Row 2 */}
            <Feature
              icon={<MaterialCommunityIcons name="shield" size={24} color="#666" />}
              title="Advance"
              value="Autopilot"
            />
            <Feature
              icon={<MaterialCommunityIcons name="battery" size={24} color="#666" />}
              title="Single Charge"
              value="405 Miles"
            />
            <Feature
              icon={<MaterialCommunityIcons name="parking" size={24} color="#666" />}
              title="Advance"
              value="Auto Parking"
            />
          </View>
        </View>

        {/* Reviews Section */}
        <View className="bg-white mt-2 px-4 py-5 mb-20">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Review (125)</Text>
         <TouchableOpacity onPress={() => router.push('/screens/Review')}>
  <Text className="text-blue-600 font-medium">See All</Text>
</TouchableOpacity>

          </View>

          <Review
            name="Mr. Jack"
            rating="5.0"
            text="The rental car was clean, reliable, and the service was quick and efficient."
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          />
          <Review
            name="Robert"
            rating="5.0"
            text="The rental car was clean, reliable, and the service was quick and efficient."
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
          />
        </View>
      </ScrollView>

      {/* Book Now Button */}
      <View className="absolute bottom-8 left-4 right-4 bg-blue-600 rounded-full shadow-lg">
        <TouchableOpacity
          className="flex-row items-center justify-center py-4"
          onPress={handleBookNow}
        >
          <Text className="text-white font-semibold text-lg mr-2">Book Now</Text>
          <Feather
            name="arrow-left"
            size={20}
            color="#fff"
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Feature = ({ icon, title, value }) => (
  <View className="w-1/3 items-center mb-6">
    <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-2">
      {icon}
    </View>
    <Text className="text-gray-600 text-sm">{title}</Text>
    <Text className="font-semibold text-gray-900">{value}</Text>
  </View>
);

const Review = ({ name, rating, text, avatar }) => (
  <View className="flex-row mb-4">
    <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />
    <View className="flex-1 ml-3">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold text-gray-900">{name}</Text>
        <View className="flex-row items-center">
          <Feather name="star" size={14} color="#fbbf24" />
          <Text className="font-semibold ml-1">{rating}</Text>
        </View>
      </View>
      <Text className="text-gray-600 text-sm mt-1">{text}</Text>
    </View>
  </View>
);

export default CarDetails;
