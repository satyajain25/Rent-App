import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CarData from '../utils/CarData.json';
import FilterDrawer from '../components/FilterDrawer'; 

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const router = useRouter();

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleCarPress = (car) => {
    // Navigate to car details page with car data
    router.push({
      pathname: './screens/CarDetails',
      params: {
        carId: car.id,
        carName: car.name,
        carImage: car.image,
        carPrice: car.price,
        carPriceType: car.priceType,
        carLocation: car.location,
        carSeats: car.seats,
        carRating: car.rating,
        // Add any other car properties you want to pass
      }
    });
  };

  const renderBrandItem = (brand) => (
    <TouchableOpacity key={brand.id} className="items-center mr-6">
      <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-2">
        <Text className="text-white text-2xl">{brand.icon}</Text>
      </View>
      <Text className="text-sm text-gray-600">{brand.name}</Text>
    </TouchableOpacity>
  );

  const renderCarCard = (car, showFullWidth = false) => (
    <TouchableOpacity 
      key={car.id} 
      className={`bg-white rounded-2xl p-4 mr-4 ${showFullWidth ? 'w-full mr-0 mb-4' : 'w-80'}`}
      onPress={() => handleCarPress(car)}
    >
      <View className="relative">
        <Image
          source={{ uri: car.image }}
          className="w-full h-40 rounded-xl"
          resizeMode="cover"
        />
        <TouchableOpacity 
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full items-center justify-center"
          onPress={(e) => {
            e.stopPropagation();  
          }}
        >
          <Ionicons name="heart-outline" size={18} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View className="mt-4">
        <Text className="text-lg font-semibold text-black mb-1">{car.name}</Text>
        
        <View className="flex-row items-center mb-2">
          <Text className="text-sm text-gray-600 mr-1">{car.rating}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
        </View>
        
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">{car.location}</Text>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text className="text-sm text-gray-600 ml-1">{car.seats} Seats</Text>
          </View>
          
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-black">${car.price}/</Text>
            <Text className="text-sm text-gray-600">{car.priceType}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="pt-12 px-5 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-black rounded-full items-center justify-center mr-3">
              <Ionicons name="car" size={20} color="white" />
            </View>
            <Text className="text-xl font-bold text-black">Qent</Text>
          </View>
          
          <View className="flex-row items-center">
            <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
              <Ionicons name="notifications-outline" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center"
              onPress={() => router.push('./components/userProfile')} 
            >
              <Ionicons name="person" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 mr-3">
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-3 text-base text-black"
              placeholder="Search your dream car..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity 
            className="w-12 h-12 bg-white rounded-xl items-center justify-center"
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Brands Section */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-semibold text-black mb-4">Brands</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {CarData.brands.map(renderBrandItem)}
            </View>
          </ScrollView>
        </View>

        {/* Best Cars Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-5 mb-4">
            <Text className="text-lg font-semibold text-black">Best Cars</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">View All</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-600 px-5 mb-4">Available</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row pl-5">
              {CarData.bestCars.map(car => renderCarCard(car))}
            </View>
          </ScrollView>
        </View>

        {/* Nearby Section */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-black">Nearby</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">View All</Text>
            </TouchableOpacity>
          </View>
          
          {CarData.nearbyCars.map(car => renderCarCard(car, true))}
        </View>
      </ScrollView>

      {/* Reusable Filter Drawer */}
      <FilterDrawer
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

export default Home;
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, Modal, Dimensions } from 'react-native';
// import React, { useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';

// import CarData from '../utils/CarData.json'

// const { width } = Dimensions.get('window');

// const Home = () => {
//   const [searchText, setSearchText] = useState('');
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedCarType, setSelectedCarType] = useState('All Cars');
//   const [priceRange, setPriceRange] = useState([10, 230]);
//   const [selectedRentalTime, setSelectedRentalTime] = useState('Day');
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedCapacity, setSelectedCapacity] = useState('4');
//   const [selectedFuelType, setSelectedFuelType] = useState('Electric');
//   const [pickupDate, setPickupDate] = useState('05 Jun 2024');
//   const [location, setLocation] = useState('Shore Dr, Chicago 0062 Usa');

//   const carTypes = ['All Cars', 'Regular Cars', 'Luxury Cars'];
//   const rentalTimes = ['Hour', 'Day', 'Weekly', 'Monthly'];
//   const colors = [
//     { name: 'White', color: '#FFFFFF' },
//     { name: 'Gray', color: '#9CA3AF' },
//     { name: 'Blue', color: '#3B82F6' },
//     { name: 'Black', color: '#000000' }
//   ];
//   const capacities = ['2', '4', '6', '8'];
//   const fuelTypes = ['Electric', 'Petrol', 'Diesel', 'Hybrid'];

//   const toggleColor = (colorName) => {
//     setSelectedColors(prev => 
//       prev.includes(colorName) 
//         ? prev.filter(c => c !== colorName)
//         : [...prev, colorName]
//     );
//   };

//   const renderBrandItem = (brand) => (
//     <TouchableOpacity key={brand.id} className="items-center mr-6">
//       <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-2">
//         <Text className="text-white text-2xl">{brand.icon}</Text>
//       </View>
//       <Text className="text-sm text-gray-600">{brand.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderCarCard = (car, showFullWidth = false) => (
//     <View key={car.id} className={`bg-white rounded-2xl p-4 mr-4 ${showFullWidth ? 'w-full mr-0 mb-4' : 'w-80'}`}>
//       <View className="relative">
//         <Image
//           source={{ uri: car.image }}
//           className="w-full h-40 rounded-xl"
//           resizeMode="cover"
//         />
//         <TouchableOpacity className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full items-center justify-center">
//           <Ionicons name="heart-outline" size={18} color="#666" />
//         </TouchableOpacity>
//       </View>
      
//       <View className="mt-4">
//         <Text className="text-lg font-semibold text-black mb-1">{car.name}</Text>
        
//         <View className="flex-row items-center mb-2">
//           <Text className="text-sm text-gray-600 mr-1">{car.rating}</Text>
//           <Ionicons name="star" size={14} color="#FFD700" />
//         </View>
        
//         <View className="flex-row items-center mb-3">
//           <Ionicons name="location-outline" size={14} color="#666" />
//           <Text className="text-sm text-gray-600 ml-1">{car.location}</Text>
//         </View>
        
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center">
//             <Ionicons name="people-outline" size={16} color="#666" />
//             <Text className="text-sm text-gray-600 ml-1">{car.seats} Seats</Text>
//           </View>
          
//           <View className="flex-row items-center">
//             <Text className="text-lg font-bold text-black">${car.price}/</Text>
//             <Text className="text-sm text-gray-600">{car.priceType}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   const FilterDrawer = () => (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={filterVisible}
//       onRequestClose={() => setFilterVisible(false)}
//     >
//       <View className="flex-1 justify-end bg-black bg-opacity-50">
//         <View className="bg-white rounded-t-3xl h-5/6">
//           <View className="px-5 py-4 border-b border-gray-200">
//             <View className="flex-row items-center justify-between">
//               <Text className="text-xl font-bold">Filters</Text>
//               <TouchableOpacity onPress={() => setFilterVisible(false)}>
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           <ScrollView className="flex-1 px-5 py-4">
//             {/* Type of Cars */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Type of Cars</Text>
//               <View className="flex-row">
//                 {carTypes.map((type) => (
//                   <TouchableOpacity
//                     key={type}
//                     onPress={() => setSelectedCarType(type)}
//                     className={`mr-3 px-4 py-2 rounded-full ${
//                       selectedCarType === type ? 'bg-black' : 'bg-gray-200'
//                     }`}
//                   >
//                     <Text className={`${selectedCarType === type ? 'text-white' : 'text-gray-600'}`}>
//                       {type}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Price Range */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Price range</Text>
//               <View className="bg-gray-100 p-4 rounded-lg">
//                 <View className="flex-row items-center justify-center mb-4">
//                   {/* Simple price range visualization */}
//                   <View className="flex-1 h-2 bg-gray-300 rounded-full">
//                     <View className="h-2 bg-black rounded-full" style={{ width: '60%' }} />
//                   </View>
//                 </View>
//                 <View className="flex-row justify-between">
//                   <View className="items-center">
//                     <Text className="text-xs text-gray-500 mb-1">Minimum</Text>
//                     <View className="bg-white px-3 py-2 rounded-lg">
//                       <Text className="font-semibold">${priceRange[0]}</Text>
//                     </View>
//                   </View>
//                   <View className="items-center">
//                     <Text className="text-xs text-gray-500 mb-1">Maximum</Text>
//                     <View className="bg-white px-3 py-2 rounded-lg">
//                       <Text className="font-semibold">${priceRange[1]}+</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Rental Time */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Rental Time</Text>
//               <View className="flex-row flex-wrap">
//                 {rentalTimes.map((time) => (
//                   <TouchableOpacity
//                     key={time}
//                     onPress={() => setSelectedRentalTime(time)}
//                     className={`mr-3 mb-2 px-4 py-2 rounded-full ${
//                       selectedRentalTime === time ? 'bg-black' : 'bg-gray-200'
//                     }`}
//                   >
//                     <Text className={`${selectedRentalTime === time ? 'text-white' : 'text-gray-600'}`}>
//                       {time}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Pick up and Drop Date */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Pick up and Drop Date</Text>
//               <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg">
//                 <View className="flex-row items-center">
//                   <Ionicons name="calendar-outline" size={20} color="#666" />
//                   <Text className="ml-2 text-gray-600">{pickupDate}</Text>
//                 </View>
//                 <Ionicons name="chevron-down" size={20} color="#666" />
//               </TouchableOpacity>
//             </View>

//             {/* Car Location */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Car Location</Text>
//               <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-lg">
//                 <Ionicons name="location-outline" size={20} color="#666" />
//                 <Text className="ml-2 text-gray-600 flex-1">{location}</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Colors */}
//             <View className="mb-6">
//               <View className="flex-row items-center justify-between mb-3">
//                 <Text className="text-lg font-semibold">Colors</Text>
//                 <TouchableOpacity>
//                   <Text className="text-blue-500">See All</Text>
//                 </TouchableOpacity>
//               </View>
//               <View className="flex-row">
//                 {colors.map((color) => (
//                   <TouchableOpacity
//                     key={color.name}
//                     onPress={() => toggleColor(color.name)}
//                     className="mr-6 items-center"
//                   >
//                     <View className="flex-row items-center mb-1">
//                       <View 
//                         className={`w-6 h-6 rounded-full mr-2 ${
//                           color.name === 'White' ? 'border border-gray-300' : ''
//                         }`}
//                         style={{ backgroundColor: color.color }}
//                       />
//                       {selectedColors.includes(color.name) && (
//                         <View className="w-2 h-2 bg-black rounded-full" />
//                       )}
//                     </View>
//                     <Text className="text-sm text-gray-600">{color.name}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Sitting Capacity */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Sitting Capacity</Text>
//               <View className="flex-row">
//                 {capacities.map((capacity) => (
//                   <TouchableOpacity
//                     key={capacity}
//                     onPress={() => setSelectedCapacity(capacity)}
//                     className={`mr-3 w-12 h-12 rounded-full items-center justify-center ${
//                       selectedCapacity === capacity ? 'bg-black' : 'bg-gray-200'
//                     }`}
//                   >
//                     <Text className={`${selectedCapacity === capacity ? 'text-white' : 'text-gray-600'}`}>
//                       {capacity}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Fuel Type */}
//             <View className="mb-6">
//               <Text className="text-lg font-semibold mb-3">Fuel Type</Text>
//               <View className="flex-row flex-wrap">
//                 {fuelTypes.map((fuel) => (
//                   <TouchableOpacity
//                     key={fuel}
//                     onPress={() => setSelectedFuelType(fuel)}
//                     className={`mr-3 mb-2 px-4 py-2 rounded-full ${
//                       selectedFuelType === fuel ? 'bg-black' : 'bg-gray-200'
//                     }`}
//                   >
//                     <Text className={`${selectedFuelType === fuel ? 'text-white' : 'text-gray-600'}`}>
//                       {fuel}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           </ScrollView>

//           {/* Bottom Buttons */}
//           <View className="px-5 py-4 border-t border-gray-200">
//             <View className="flex-row">
//               <TouchableOpacity className="flex-1 mr-2 p-4 bg-gray-200 rounded-lg">
//                 <Text className="text-center font-semibold">Clear All</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 className="flex-1 ml-2 p-4 bg-black rounded-lg"
//                 onPress={() => setFilterVisible(false)}
//               >
//                 <Text className="text-center font-semibold text-white">Show 100+ Cars</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
//       {/* Header */}
//       <View className="pt-12 px-5 pb-4">
//         <View className="flex-row items-center justify-between mb-6">
//           <View className="flex-row items-center">
//             <View className="w-10 h-10 bg-black rounded-full items-center justify-center mr-3">
//               <Ionicons name="car" size={20} color="white" />
//             </View>
//             <Text className="text-xl font-bold text-black">Qent</Text>
//           </View>
          
//           <View className="flex-row items-center">
//             <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
//               <Ionicons name="notifications-outline" size={20} color="#666" />
//             </TouchableOpacity>
//             <TouchableOpacity className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center">
//               <Ionicons name="person" size={20} color="#666" />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* Search Bar */}
//         <View className="flex-row items-center mb-4">
//           <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 mr-3">
//             <Ionicons name="search-outline" size={20} color="#666" />
//             <TextInput
//               className="flex-1 ml-3 text-base text-black"
//               placeholder="Search your dream car..."
//               placeholderTextColor="#9ca3af"
//               value={searchText}
//               onChangeText={setSearchText}
//             />
//           </View>
//           <TouchableOpacity 
//             className="w-12 h-12 bg-white rounded-xl items-center justify-center"
//             onPress={() => setFilterVisible(true)}
//           >
//             <Ionicons name="options-outline" size={20} color="#666" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Brands Section */}
//         <View className="px-5 mb-6">
//           <Text className="text-lg font-semibold text-black mb-4">Brands</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View className="flex-row">
//               {CarData.brands.map(renderBrandItem)}
//             </View>
//           </ScrollView>
//         </View>

//         {/* Best Cars Section */}
//         <View className="mb-6">
//           <View className="flex-row items-center justify-between px-5 mb-4">
//             <Text className="text-lg font-semibold text-black">Best Cars</Text>
//             <TouchableOpacity>
//               <Text className="text-sm text-blue-600">View All</Text>
//             </TouchableOpacity>
//           </View>
//           <Text className="text-sm text-gray-600 px-5 mb-4">Available</Text>
          
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View className="flex-row pl-5">
//               {CarData.bestCars.map(car => renderCarCard(car))}
//             </View>
//           </ScrollView>
//         </View>

//         {/* Nearby Section */}
//         <View className="px-5 mb-6">
//           <View className="flex-row items-center justify-between mb-4">
//             <Text className="text-lg font-semibold text-black">Nearby</Text>
//             <TouchableOpacity>
//               <Text className="text-sm text-blue-600">View All</Text>
//             </TouchableOpacity>
//           </View>
          
//           {CarData.nearbyCars.map(car => renderCarCard(car, true))}
//         </View>
//       </ScrollView>

//       <FilterDrawer />
//     </View>
//   );
// };

// export default Home;
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
// import React, { useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';

// import CarData from '../utils/CarData.json'

// const Home = () => {
//   const [searchText, setSearchText] = useState('');

//   const renderBrandItem = (brand) => (
//     <TouchableOpacity key={brand.id} className="items-center mr-6">
//       <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-2">
//         <Text className="text-white text-2xl">{brand.icon}</Text>
//       </View>
//       <Text className="text-sm text-gray-600">{brand.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderCarCard = (car, showFullWidth = false) => (
//     <View key={car.id} className={`bg-white rounded-2xl p-4 mr-4 ${showFullWidth ? 'w-full mr-0 mb-4' : 'w-80'}`}>
//       <View className="relative">
//         <Image
//           source={{ uri: car.image }}
//           className="w-full h-40 rounded-xl"
//           resizeMode="cover"
//         />
//         <TouchableOpacity className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full items-center justify-center">
//           <Ionicons name="heart-outline" size={18} color="#666" />
//         </TouchableOpacity>
//       </View>
      
//       <View className="mt-4">
//         <Text className="text-lg font-semibold text-black mb-1">{car.name}</Text>
        
//         <View className="flex-row items-center mb-2">
//           <Text className="text-sm text-gray-600 mr-1">{car.rating}</Text>
//           <Ionicons name="star" size={14} color="#FFD700" />
//         </View>
        
//         <View className="flex-row items-center mb-3">
//           <Ionicons name="location-outline" size={14} color="#666" />
//           <Text className="text-sm text-gray-600 ml-1">{car.location}</Text>
//         </View>
        
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center">
//             <Ionicons name="people-outline" size={16} color="#666" />
//             <Text className="text-sm text-gray-600 ml-1">{car.seats} Seats</Text>
//           </View>
          
//           <View className="flex-row items-center">
//             <Text className="text-lg font-bold text-black">${car.price}/</Text>
//             <Text className="text-sm text-gray-600">{car.priceType}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
//       {/* Header */}
//       <View className="pt-12 px-5 pb-4">
//         <View className="flex-row items-center justify-between mb-6">
//           <View className="flex-row items-center">
//             <View className="w-10 h-10 bg-black rounded-full items-center justify-center mr-3">
//               <Ionicons name="car" size={20} color="white" />
//             </View>
//             <Text className="text-xl font-bold text-black">Qent</Text>
//           </View>
          
//           <View className="flex-row items-center">
//             <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
//               <Ionicons name="notifications-outline" size={20} color="#666" />
//             </TouchableOpacity>
//             <TouchableOpacity className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center">
//               <Ionicons name="person" size={20} color="#666" />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* Search Bar */}
//         <View className="flex-row items-center mb-4">
//           <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 mr-3">
//             <Ionicons name="search-outline" size={20} color="#666" />
//             <TextInput
//               className="flex-1 ml-3 text-base text-black"
//               placeholder="Search your dream car..."
//               placeholderTextColor="#9ca3af"
//               value={searchText}
//               onChangeText={setSearchText}
//             />
//           </View>
//           <TouchableOpacity className="w-12 h-12 bg-white rounded-xl items-center justify-center">
//             <Ionicons name="options-outline" size={20} color="#666" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Brands Section */}
//         <View className="px-5 mb-6">
//           <Text className="text-lg font-semibold text-black mb-4">Brands</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View className="flex-row">
//               {CarData.brands.map(renderBrandItem)}
//             </View>
//           </ScrollView>
//         </View>

//         {/* Best Cars Section */}
//         <View className="mb-6">
//           <View className="flex-row items-center justify-between px-5 mb-4">
//             <Text className="text-lg font-semibold text-black">Best Cars</Text>
//             <TouchableOpacity>
//               <Text className="text-sm text-blue-600">View All</Text>
//             </TouchableOpacity>
//           </View>
//           <Text className="text-sm text-gray-600 px-5 mb-4">Available</Text>
          
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View className="flex-row pl-5">
//               {CarData.bestCars.map(car => renderCarCard(car))}
//             </View>
//           </ScrollView>
//         </View>

//         {/* Nearby Section */}
//         <View className="px-5 mb-6">
//           <View className="flex-row items-center justify-between mb-4">
//             <Text className="text-lg font-semibold text-black">Nearby</Text>
//             <TouchableOpacity>
//               <Text className="text-sm text-blue-600">View All</Text>
//             </TouchableOpacity>
//           </View>
          
//           {CarData.nearbyCars.map(car => renderCarCard(car, true))}
//         </View>
//       </ScrollView>

      
//     </View>
//   );
// };

// export default Home;