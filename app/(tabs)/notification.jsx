import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const notificationsData = [
  {
    id: '1',
    title: 'Car Booking Successful',
    message:
      'Your car is ready! Check your email for the booking and pickup instructions. Safe travels!',
    time: '10:00 am',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Payment Notification',
    message: 'Your payment was processed successfully! Enjoy your ride.',
    time: '10:00 am',
    date: 'Today',
  },
  {
    id: '3',
    title: 'Car Pickup/Drop-off time',
    message: 'Pickup time confirmed! See you at [Time] for your car rental.',
    time: '09:00 am',
    date: 'Today',
  },
  {
    id: '4',
    title: 'Late Return Warning',
    message: 'Please return the car as soon as possible to avoid extra charges.',
    date: 'Previous',
  },
  {
    id: '5',
    title: 'Cancellation Notice',
    message: 'Your reservation has been canceled successfully.',
    date: 'Previous',
  },
  {
    id: '6',
    title: 'Discount Notification',
    message: "You've unlocked a 10% discount on your next rental.",
    date: 'Previous',
  },
];

const notification = () => {
  const [selected, setSelected] = useState([]);
  const [notifications, setNotifications] = useState(notificationsData);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to delete your notifications permanently?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications((prev) =>
              prev.filter((n) => !selected.includes(n.id))
            );
            setSelected([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item.id)}
      className="flex-row items-start px-4 py-3 border-b border-gray-200 bg-white"
    >
      {selected.length > 0 && (
        <View className="mr-3 mt-1">
          <View
            className={`w-5 h-5 rounded-full border-2 ${
              selected.includes(item.id)
                ? 'bg-black border-black'
                : 'border-gray-400'
            }`}
          />
        </View>
      )}
      <View className="flex-1">
        <Text className="font-semibold text-base text-black">{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.message}</Text>
        {item.time && (
          <Text className="text-xs text-gray-400 mt-1">{item.time}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <Text className="text-lg font-semibold">Notification</Text>
        {selected.length > 0 && (
          <TouchableOpacity onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
          <Text className="mt-4 text-gray-500 text-center">
            No Notifications{'\n'}Clutter Cleared. We'll notify you when there
            is something new.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default notification;

