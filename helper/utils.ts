import AsyncStorage from '@react-native-async-storage/async-storage'

function getMinimumFractionDigits(unit: string): number {
  switch (unit) {
    case 'VND':
      return 0
    default:
      return 2
  }
}

function formatCurrency(unit: string): any {
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: unit,
    minimumFractionDigits: getMinimumFractionDigits(unit)
  })
}

async function AsyncStorageGetItem(key: any) {
  const data = await AsyncStorage.getItem(key)
  return data !== null ? JSON.parse(data) : null
}

async function AsyncStorageRemove(key: string) {
  return await AsyncStorage.removeItem(key)
}

async function AsyncStorageSetItem(key: any, value: any) {
  return await AsyncStorage.setItem(key, JSON.stringify(value))
}

async function AsyncStorageClear() {
  return await AsyncStorage.clear()
}

function formatDate(date: any) {
  var data = new Date(date)
  var day = data.getDate().toString()
  var month = (data.getMonth() + 1).toString()
  var year = data.getFullYear()
  var hours = data.getHours().toString()
  var minutes = data.getMinutes().toString()
  var seconds = data.getSeconds().toString()
  if (day.length == 1 ) {
    day = `0${day}`
  }
  if (month.length == 1 ) {
    month = `0${month}`
  }
  return `${day}/${month}/${year} - ${hours}h:${minutes}m:${seconds}s`
}

export { getMinimumFractionDigits, formatCurrency, AsyncStorageGetItem, AsyncStorageSetItem, AsyncStorageRemove, AsyncStorageClear, formatDate }