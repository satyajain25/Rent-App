import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";

const signup = () => {
  const router = useRouter();
 const [name, setName] = useState("");
 const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Fake login logic (replace with actual logic if needed)
    if (email === "test@example.com" && password === "password123") {
      Alert.alert("Login Successful", "Welcome back!", [
        { text: "Continue", onPress: () => router.push("/auth(login)") },
      ]);
    } else {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: "#F5F5F5" }}
        >
          <View className="flex-1 px-6 pt-16 ">
            {/* Header */}
            <View className="items-start mb-8 mt-9">
              <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-4 ">
                <Ionicons name="car" size={24} color="white" />
              </View>
              <Text className="text-black text-lg font-semibold">Qent</Text>
            </View>

            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="text-black text-2xl font-bold leading-tight">
                Welcome Back
              </Text>
              <Text className="text-black text-2xl font-bold leading-tight mb-2">
                Ready to hit the road.
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
                 <View className="mb-4">
                <TextInput
                  className="bg-white rounded-lg px-4 py-4 text-gray-700 text-base border border-gray-200"
                  placeholder="Email/Phone Number"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {/* Email Input */}
              <View className="mb-4">
                <TextInput
                  className="bg-white rounded-lg px-4 py-4 text-gray-700 text-base border border-gray-200"
                  placeholder="Email/Phone Number"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <View className="bg-white rounded-lg border border-gray-200 flex-row items-center px-4 py-4">
                  <TextInput
                    className="flex-1 text-gray-700 text-base"
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
                <View className="mb-4">
                <TextInput
                  className="bg-white rounded-lg px-4 py-4 text-gray-700 text-base border border-gray-200"
                  placeholder="Email/Phone Number"
                  placeholderTextColor="#9CA3AF"
                  value={country}
                  onChangeText={setCountry}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>


              {/* Login Button */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
                className="bg-black rounded-full py-4 items-center mb-4"
              >
                <Text className="text-white font-semibold text-base">Login</Text>
              </TouchableOpacity>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/signup")}
                className="border rounded-full py-4 items-center mb-6"
              >
                <Text className="text-black font-semibold text-base">Sign up</Text>
              </TouchableOpacity>

              {/* Or Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500 text-sm">Or</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Apple Pay Button */}
              <TouchableOpacity className="bg-white rounded-full py-4 items-center  border border-gray-200 flex-row justify-center mb-9">
                <Ionicons name="logo-apple" size={20} color="black" style={{ marginRight: 8 }} />
                <Text className="text-black font-medium text-base">Apple pay</Text>
              </TouchableOpacity>

              {/* Google Pay Button */}
              <TouchableOpacity className="bg-white rounded-full py-4 items-center mb-6 border border-gray-200 flex-row justify-center">
                <Ionicons name="logo-google" size={20} color="#4285F4" style={{ marginRight: 8 }} />
                <Text className="text-black font-medium text-base">Google Pay</Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="items-center">
                <Text className="text-gray-600 text-sm">
                  Don't have an account? 
                  <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                    <Text className="text-black font-semibold"> Sign Up</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default signup;