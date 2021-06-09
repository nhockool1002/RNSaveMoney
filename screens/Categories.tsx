// @ts-nocheck
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CategoryListItem from '../components/CategoryListItem'
import ProfitImage from '../assets/profit.png'
import ExchangeRateImage from '../assets/exchange-rate.png'
import StatisticsImage from '../assets/statistics.png'
import DonateImage from '../assets/donate.png'

const CATEGORY_LIST = {
  LIST_ACCOUNT: 'List Account',
  EXCHANGE_RATE: 'Exchange Rate',
  STATISTICS: 'Statistics',
  DONATE: 'BUY ME COFFEE'
}
export default function Categories({ navigation }) {
  const {
    LIST_ACCOUNT,
    EXCHANGE_RATE,
    STATISTICS,
    DONATE
  } = CATEGORY_LIST

  const listCategory = [
    {id: 1, title: LIST_ACCOUNT, image: ProfitImage},
    {id: 2, title: EXCHANGE_RATE, image: ExchangeRateImage},
    {id: 3, title: STATISTICS, image: StatisticsImage},
    {id: 4, title: DONATE, image: DonateImage}
  ]

  const navigateCategoryFunction = (navigation: any, id: number) => {
    if (id === 1) {
      navigation.navigate('ListAccounts')
    }
    if (id === 2) {
      navigation.navigate('ListExchangeRate')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList 
        data={listCategory}
        renderItem={({item}) => <CategoryListItem item={item} onPress={() => navigateCategoryFunction(navigation, item.id)} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingTop: 16, paddingLeft: 16, paddingRight: 16}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${process.env.PRIMARY_DARK_COLOR}`
  }
})