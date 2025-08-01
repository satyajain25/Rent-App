import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {logo,background,background1} from '../../assets/index'
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to\nQent',
    subtitle: '',
    image: background, // Replace with your car image
    showButton: true,
    buttonText: 'Get Started'
  },
  {
    id: 2,
    title: 'Lets Start\nA New Experience\nWith Car rental.',
    subtitle: 'Discover your next adventure with Qent. we\'re here to provide you with a seamless car rental experience. Let\'s get started on your journey.',
    image: background1, // Replace with your car image
    showButton: true,
    buttonText: 'Get Started'
  }
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

const handleGetStarted = () => {
  router.push('/login'); // ✅ use absolute path for clarity
};


  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center mb-8">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-full ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View className="absolute top-12 mt-20 left-6 z-10">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
          <Image 
            source={logo} 
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} className="w-full " style={{ width }}>
            <Image
              source={item.image}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />

            <View className="absolute inset-0 bg-black/50" />
            {/* <View className="flex-1 justify-center px-6 pb-32">
              <Text className="text-white text-4xl font-bold mb-4 leading-tight">
                {item.title}
              </Text>
              
              {item.subtitle && (
                <Text className="text-gray-300 text-base leading-6 mb-8">
                  {item.subtitle}
                </Text>
              )}
              
              {item.showButton && (
                <TouchableOpacity
                  className="bg-gray-800/80 py-4 px-8 rounded-full items-center"
                  onPress={handleGetStarted}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-lg font-semibold">
                    {item.buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View> */}
             <View className="flex-1 justify-center px-6 pb-32">
              <Text className="text-white text-4xl font-bold mb-4 leading-tight">
                {item.title}
              </Text>
              
              {item.subtitle && (
                <Text className="text-gray-300 text-base leading-6 mb-8">
                  {item.subtitle}
                </Text>
              )}
              
              {item.showButton && (
                <TouchableOpacity
                  className="bg-gray-800/80 py-4 px-8 rounded-full items-center"
                  onPress={handleGetStarted}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-lg font-semibold">
                    {item.buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-40 left-0 right-0">
        {renderDots()}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;