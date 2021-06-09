import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import AppNavigator from './AppNavigator'
import {AsyncStorageSetItem, AsyncStorageGetItem, AsyncStorageClear} from './helper/utils'

export default function App() {
  const __checkData = async () => {
    try {
      const value = await AsyncStorageGetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT)
      if (value === null) {
        await AsyncStorageSetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT, [])
        console.log('Init @listAccount complete')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // AsyncStorageClear()
    __checkData()
  }, [])

  return (
    <AppNavigator />
  );
}
