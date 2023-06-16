import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import { Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Pressable
                onPress={async () => {
                  await AsyncStorage.removeItem('email');
                  await AsyncStorage.removeItem('senha');
                  await AsyncStorage.removeItem('message');
                }}
              >
                <Icon
                  style={{ marginRight: 20 }}
                  name="logout"
                  size={24}
                  color="#4b9fe1"
                />
              </Pressable>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
