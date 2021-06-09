// @ts-nocheck
import React from 'react'
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators
} from '@react-navigation/stack'
import Transaction from '../screens/Transaction';


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

export default function TransactionStackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen 
      name="Transaction"
      component={Transaction}
      options={{
        title: 'Transaction',
        ...MyTransition
      }}
    />
  </Stack.Navigator>
  )
}