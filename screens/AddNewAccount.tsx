//@ts-nocheck
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
  Touchable,
  TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import RegisteredImage from '../assets/registered.png'
import {AsyncStorageGetItem, AsyncStorageSetItem, AsyncStorageClear} from '../helper/utils'
import uuid from 'react-native-uuid';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AddNewAccount(props: any) {
  const { navigation } = props
  const [accountName, setAccountName] = useState('')
  const [amount, setAmount] = useState('')
  const [currencyUnit, setCurrencyUnit] = useState('')
  const [checkAccountName, setCheckAccountName] = useState('none')
  const [checkAmount, setCheckAmount] = useState('none')
  const [checkUnit, setCheckUnit] = useState('none')
  const [spinner, setSpinner] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`,
      justifyContent: 'center'
    },
    wrapImage: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 36
    },
    imageRegister: {
      width: 80,
      height: 80
    },
    input: {
      height: 50,
      backgroundColor: `${process.env.WHITE_COLOR}`,
      fontSize: 20,
      padding: 10,
      marginLeft: 10,
      marginRight: 10
    },
    labelName: {
      color: `${process.env.WHITE_COLOR}`,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      fontSize: 20,
    },
    wrapSelectbox: {
      backgroundColor: `${process.env.WHITE_COLOR}`,
      marginLeft: 10,
      marginRight: 10
    },
    errorMessage: {
      color: `${process.env.WHITE_COLOR}`,
      fontWeight: 'bold',
    },
    buttonSubmit: {
      color: `${process.env.WHITE_COLOR}`,
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    wrapButton: {
      backgroundColor: `${process.env.PRIMARY_GREEN_COLOR}`,
      height: 50,
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      alignItems: 'center'
    },
    wrapErrorAccountName: {
      ...WRAP_ERROR_CONSTANT,
      display: `${checkAccountName}`
    },
    wrapErrorAmount: {
      ...WRAP_ERROR_CONSTANT,
      display: `${checkAmount}`
    },
    wrapErrorUnit: {
      ...WRAP_ERROR_CONSTANT,
      display: `${checkUnit}`
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  })

  const onChangeAccountName = (value: string) => {
    setAccountName(value)
    if (value.length > 0) {
      setCheckAccountName('none')
    } else {
      setCheckAccountName('flex')
    }
  }

  const onChangeAmount = (value: string) => {
    setAmount(value)
    if (value.length > 0) {
      setCheckAmount('none')
    } else {
      setCheckAmount('flex')
    }
  }

  const onChangeUnit = (value: string|null) => {
    if (typeof(value) !== 'object') {
      setCurrencyUnit(value)
    } else {
      value = ''
      setCurrencyUnit(value)
    }
    if (value?.length > 0) {
      setCheckUnit('none')
    } else {
      setCheckUnit('flex')
    }
  }

  const onSubmitRegister = () => {
    if (accountName.length === 0) setCheckAccountName('flex')
    if (amount.length === 0) setCheckAmount('flex')
    if (currencyUnit.length === 0) setCheckUnit('flex')
    if (accountName.length > 0 && amount.length > 0 && currencyUnit.length > 0) storeAsyncStorage()
    return
  }

  const storeAsyncStorage = async () => {
    if (accountName.length > 0 && amount.length > 0 && currencyUnit.length > 0) {
      try {
        const newAccount = {
          id: uuid.v4(),
          accountName,
          amount,
          currencyUnit,
          createAt: new Date()
        }
        const value = await AsyncStorageGetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT)
        value.push(newAccount)
        setSpinner(true)
        setTimeout(async () => {
          await AsyncStorageSetItem(process.env.ASYNC_STORAGE_LIST_ACCOUNT, value)
          .then(() => {
            setSpinner(false)
            setAccountName('')
            setCurrencyUnit('')
            setAmount('')
            navigation.navigate('ListAccounts')
          })
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Error !!!')
      return
    }
  }

  return <SafeAreaView style={styles.container}>
    <Spinner
      visible={spinner}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
    />
    <View style={styles.wrapImage}>
      <Image source={RegisteredImage} style={styles.imageRegister} />
    </View>
    <Text style={styles.labelName}>Account Name</Text>
    <TextInput
        style={styles.input}
        onChangeText={onChangeAccountName}
        placeholder="Eg. Vietcombank"
        keyboardType="default"
    />
    <View style={styles.wrapErrorAccountName}>
      <Text style={styles.errorMessage}>Account Name is Required !</Text>
    </View>
    <Text style={styles.labelName}>Amount of money</Text>
    <TextInput
        style={styles.input}
        onChangeText={onChangeAmount}
        placeholder="Eg. 1000"
        keyboardType="numeric"
    />
    <View style={styles.wrapErrorAmount}>
      <Text style={styles.errorMessage}>Amount of money is Required !</Text>
    </View>
    <Text style={styles.labelName}>Currency Unit</Text>
    <View style={styles.wrapSelectbox}>
    <RNPickerSelect
        onValueChange={(value) => onChangeUnit(value)}
        items={[
            { label: 'VND', value: 'VND' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
        ]}
        style={pickerSelectStyles}
    />
    </View>
    <View style={styles.wrapErrorUnit}>
      <Text style={styles.errorMessage}>Currency Unit is Required !</Text>
    </View>
    <TouchableOpacity onPress={() => onSubmitRegister()}>
      <View style={styles.wrapButton}>
          <Text style={styles.buttonSubmit}>Submit</Text>
      </View>
    </TouchableOpacity>
  </SafeAreaView>
}

const WRAP_ERROR_CONSTANT = {
  justifyContent: 'center',
  height: 50,
  backgroundColor: `${process.env.RED_COLOR}`,
  marginLeft: 10,
  marginRight: 10,
  paddingLeft: 10
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: `${process.env.WHITE_COLOR}`,
    color: `${process.env.BLACK_COLOR}`,
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 400,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    height: 50,
    color: `${process.env.BLACK_COLOR}`,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});