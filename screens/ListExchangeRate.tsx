import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import MockExchangeRateItem from '../mock/listExchange.json'
import ExchangeRateItem from '../components/ExchangeRateItem';


export default function ListExchangeRate(props: any) {
  const [list, setList] = useState()
  const preExecuteExchangeRate = (obj: object) => {
    // @ts-ignore
    var result = Object.keys(obj).map((key, index) => [index, key, obj[key]]);
    result.shift()
    return result
  }

  useEffect(() => {
    let isMounted = true;  
    // @ts-ignore
    if (isMounted) setList(preExecuteExchangeRate(MockExchangeRateItem.conversion_rates))
    return () => { isMounted = false }
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.baseCurrency}>
        <Text style={styles.labelBaseCurrency}>BASE CURRENCY: </Text><Text style={styles.labelCurrency}>{process.env.CURRENCY_EXCHANGE_API_BASE}</Text>
      </View>
      <FlatList 
        data={list}
        numColumns={3}
        renderItem={({item}) => <View style={styles.wrapper}><ExchangeRateItem item={item} /></View>}
        keyExtractor={item => item[0].toString()}
        contentContainerStyle={{paddingTop: 16, paddingLeft: 8, paddingRight: 8, paddingBottom: 4}}
      />
    </View>
  );
}

ListExchangeRate.propTypes = {
  item: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`,
  },
  baseCurrency: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    justifyContent: 'center'
  },
  labelBaseCurrency: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: `${process.env.WHITE_COLOR}`,
  },
  labelCurrency: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red'
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8
  }
})
