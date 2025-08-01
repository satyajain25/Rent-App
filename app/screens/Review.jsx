import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { ArrowLeft, Search, MoreHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
const Review = () => {
    const router = useRouter();
  const reviews = [
    {
      id: 1,
      name: 'Mr. Jack',
      time: 'Today',
      rating: 5,
      comment: 'The rental car was clean, reliable, and the service was quick and efficient. Overall, the experience was hassle-free and enjoyable.',
      avatar: 'MJ'
    },
    {
      id: 2,
      name: 'Robert',
      time: 'Yesterday',
      rating: 5,
      comment: 'The rental car was clean, reliable, and the service was quick and efficient. Overall, the experience was hassle-free and enjoyable.',
      avatar: 'R'
    },
    {
      id: 3,
      name: 'Julisa',
      time: '2 Weeks ago',
      rating: 5,
      comment: 'The rental car was clean, reliable, and the service was quick and efficient. Overall, the experience was hassle-free and enjoyable.',
      avatar: 'J'
    },
    {
      id: 4,
      name: 'Mr. Jon',
      time: '3 Weeks ago',
      rating: 5,
      comment: 'The rental car was clean, reliable, and the service was quick and efficient. Overall, the experience was hassle-free and enjoyable.',
      avatar: 'MJ'
    },
    {
      id: 5,
      name: 'Henrick',
      time: '3 Weeks ago',
      rating: 4,
      comment: 'The rental car was clean, reliable, and the service was quick and efficient. Overall, the experience was hassle-free and enjoyable.',
      avatar: 'H'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Text key={index} className={`text-lg ${index < rating ? 'text-orange-400' : 'text-gray-300'}`}>
        ★
      </Text>
    ));
  };
  const handleBookNow = () => {
  router.push('/screens/BookingDetails');
};
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
         <TouchableOpacity onPress={() => router.push('/screens/CarDetails')}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Reviews</Text>
        <TouchableOpacity>
          <MoreHorizontal size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Rating Summary */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <Text className="text-orange-400 text-lg mr-1">★</Text>
          <Text className="text-gray-900 font-medium">5.0 Reviews (125)</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Find reviews..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-gray-900"
          />
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView className="flex-1 bg-white">
        {reviews.map((review) => (
          <View key={review.id} className="px-4 py-4 border-b border-gray-100">
            <View className="flex-row items-start">
              {/* Avatar */}
              <View className={`w-10 h-10 rounded-full ${getAvatarColor(review.name)} items-center justify-center mr-3`}>
                <Text className="text-white font-medium text-sm">{review.avatar}</Text>
              </View>

              {/* Review Content */}
              <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-900 font-medium">{review.name}</Text>
                  <Text className="text-gray-500 text-sm">{review.time}</Text>
                </View>

                {/* Stars */}
                <View className="flex-row mb-2">
                  {renderStars(review.rating)}
                </View>

                {/* Comment */}
                <Text className="text-gray-600 text-sm leading-5">
                  {review.comment}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Book Now Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-gray-800 py-4 rounded-lg flex-row items-center justify-center"   onPress={handleBookNow} >
          <Text className="text-white font-semibold text-base mr-2">Book Now</Text>
          <Text className="text-white">→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Review;