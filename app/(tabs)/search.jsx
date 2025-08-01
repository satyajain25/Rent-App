import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import carsData from '../utils/CarData.json';
import { useRouter } from 'expo-router';
import FilterDrawer from '../components/FilterDrawer'; 
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
const router = useRouter();
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
    // Here you can implement your filtering logic
  };

  const renderBrandItem = (brand) => (
    <TouchableOpacity key={brand.id} className="items-center mr-6">
      <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-2">
        <Text className="text-white text-2xl">{brand.icon}</Text>
      </View>
      <Text className="text-sm text-gray-600">{brand.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
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
           onPress={() => router.push('/components/userProfile')} 
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
              {carsData.brands.map(renderBrandItem)}
            </View>
          </ScrollView>
        </View>
      
        <View className="px-5">
          <Text className="text-lg font-bold mb-2">Recommend For You</Text>
          <ScrollView horizontal className="mb-4">
            {carsData.recommendedCars.map((car) => (
              <View key={car.id} className="bg-gray-100 rounded-lg p-2 mr-2 w-48">
                <Image source={{ uri: car.image }} className="w-full h-24 rounded" />
                <Text className="font-bold">{car.name}</Text>
                <View className="flex-row items-center">
                  <Text className="text-yellow-500">★ {car.rating}</Text>
                  <Text className="text-xs text-gray-500 ml-2">❤️ {car.location}</Text>
                </View>
                <Text className="font-bold">${car.price}/{car.priceType}</Text>
                <TouchableOpacity className="bg-gray-400 p-2 rounded mt-2">
                  <Text className="text-white text-center">Book now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <Text className="text-lg font-bold mb-2">Our Popular Cars</Text>
          <ScrollView horizontal>
            {carsData.popularCars.map((car) => (
              <View key={car.id} className="bg-gray-100 rounded-lg p-2 mr-2 w-48">
                <Image source={{ uri: car.image }} className="w-full h-24 rounded" />
                <Text className="font-bold">{car.name}</Text>
                <View className="flex-row items-center">
                  <Text className="text-yellow-500">★ {car.rating}</Text>
                </View>
                <Text className="font-bold">${car.price}/{car.priceType}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Reusable Filter Drawer */}
      <FilterDrawer
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </ScrollView>
  );
};

export default Search;
// import React, { useState } from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import carsData from '../utils/CarData.json';

// const { width } = Dimensions.get('window');

// const Search = () => {
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

//   const renderBrandItem = (brand) => (
//     <TouchableOpacity key={brand.id} className="items-center mr-6">
//       <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-2">
//         <Text className="text-white text-2xl">{brand.icon}</Text>
//       </View>
//       <Text className="text-sm text-gray-600">{brand.name}</Text>
//     </TouchableOpacity>
//   );

//   const toggleColor = (colorName) => {
//     setSelectedColors(prev => 
//       prev.includes(colorName) 
//         ? prev.filter(c => c !== colorName)
//         : [...prev, colorName]
//     );
//   };

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
//     <ScrollView className="flex-1 bg-gray-50">
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
//               {carsData.brands.map(renderBrandItem)}
//             </View>
//           </ScrollView>
//         </View>
      
//         <View className="px-5">
//           <Text className="text-lg font-bold mb-2">Recommend For You</Text>
//           <ScrollView horizontal className="mb-4">
//             {carsData.recommendedCars.map((car) => (
//               <View key={car.id} className="bg-gray-100 rounded-lg p-2 mr-2 w-48">
//                 <Image source={{ uri: car.image }} className="w-full h-24 rounded" />
//                 <Text className="font-bold">{car.name}</Text>
//                 <View className="flex-row items-center">
//                   <Text className="text-yellow-500">★ {car.rating}</Text>
//                   <Text className="text-xs text-gray-500 ml-2">❤️ {car.location}</Text>
//                 </View>
//                 <Text className="font-bold">${car.price}/{car.priceType}</Text>
//                 <TouchableOpacity className="bg-gray-400 p-2 rounded mt-2">
//                   <Text className="text-white text-center">Book now</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
          
//           <Text className="text-lg font-bold mb-2">Our Popular Cars</Text>
//           <ScrollView horizontal>
//             {carsData.popularCars.map((car) => (
//               <View key={car.id} className="bg-gray-100 rounded-lg p-2 mr-2 w-48">
//                 <Image source={{ uri: car.image }} className="w-full h-24 rounded" />
//                 <Text className="font-bold">{car.name}</Text>
//                 <View className="flex-row items-center">
//                   <Text className="text-yellow-500">★ {car.rating}</Text>
//                 </View>
//                 <Text className="font-bold">${car.price}/{car.priceType}</Text>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </ScrollView>

//       <FilterDrawer />
//     </ScrollView>
//   );
// };

// export default Search;