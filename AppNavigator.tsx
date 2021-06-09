import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStackNavigator from './stack/MainStackNavigator'
import ContactStackNavigator from './stack/ContactStackNavigator'
import TransactionStackNavigator from './stack/TransactionStackNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'file-tray'
              : 'file-tray-outline';
          } else if (route.name === 'Contact') {
            iconName = focused
              ? 'mail-open'
              : 'mail-open-outline';
          } else if (route.name === 'Transaction') {
            iconName = focused
              ? 'receipt'
              : 'receipt-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: `${process.env.WHITE_COLOR}`,
        activeBackgroundColor: `${process.env.PRIMARY_GREEN_COLOR}`,
        inactiveTintColor: `${process.env.WHITE_COLOR}`,
        inactiveBackgroundColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`
      }}
      >
        <Tab.Screen name="Home" component={MainStackNavigator} />
        <Tab.Screen name="Transaction" component={TransactionStackNavigator} />
        <Tab.Screen name="Contact" component={ContactStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator