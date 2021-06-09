//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import AccountItem from '../components/AccountItem';
import { FAB } from 'react-native-paper';
import {AsyncStorageGetItem, AsyncStorageSetItem, AsyncStorageClear} from '../helper/utils'
import Spinner from 'react-native-loading-spinner-overlay';

export default function ListAccounts({navigation}) {
  const [listAccount, setListAccount] = useState()
  const [spinner, setSpinner] = useState(false)
  const getData = async () => {
    const data = await AsyncStorageGetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT)
    setListAccount(data)
  }

  const deleteAccount = (id: any) => {
    setSpinner(true)
    setTimeout(async () => {
      const newArray = listAccount
      if (newArray !== undefined) {
        const index = newArray.findIndex((item: any) => item.id == id)
        newArray.splice(index, 1)
        await AsyncStorageSetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT, newArray)
        getData()
        setSpinner(false)
      }
    }, 1500)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <FlatList 
        data={listAccount}
        renderItem={({item}) => <AccountItem item={item} deleteAccount={deleteAccount} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingTop: 16, paddingLeft: 16, paddingRight: 16}}
      />
      <FAB
        style={styles.fab}
        small
        animated
        icon="plus"
        onPress={() => navigation.navigate('AddNewAccount')}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${process.env.PRIMARY_DARK_COLOR}`,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: `${process.env.PRIMARY_GREEN_COLOR}`
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})

