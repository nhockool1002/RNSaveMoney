// @ts-nocheck
import React from 'react'
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators
} from '@react-navigation/stack'
import Categories from '../screens/Categories'
import ListAccounts from '../screens/ListAccounts';
import ListExchangeRate from '../screens/ListExchangeRate';
import AddNewAccount from '../screens/AddNewAccount';


const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  headerStyle: {
    backgroundColor: `${process.env.PRIMARY_GREEN_COLOR}`,
  },
  headerTintColor: `${process.env.WHITE_COLOR}`,
  headerBackTitle: 'Back',
}

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen 
      name="Categories"
      component={Categories}
      options={{
        title: 'Categories',
        ...MyTransition
      }}
    />
    <Stack.Screen 
      name="ListAccounts" 
      component={ListAccounts}
      options={{
        title: 'List Accounts',
        ...MyTransition
      }}
    />
    <Stack.Screen 
      name="ListExchangeRate" 
      component={ListExchangeRate}
      options={{
        title: 'List Exchange Rate',
        ...MyTransition
      }}
    />
    <Stack.Screen 
      name="AddNewAccount" 
      component={AddNewAccount}
      options={{
        title: 'Add New Account',
        ...MyTransition
      }}
    />
  </Stack.Navigator>
  )
}