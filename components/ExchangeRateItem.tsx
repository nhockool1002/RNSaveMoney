import React from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

export default function ExchangeRateItem(props: any) {
  const {item} = props
  return <View style={styles.item}>
    <Text style={styles.country}>{item[1]}</Text>
    <Text style={styles.rate}>{item[2]}</Text>
  </View>
}

ExchangeRateItem.propTypes = {
  item: PropTypes.any
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    /* CSS SHADOW FOR iOS */
    backgroundColor: `${process.env.BLACK_COLOR}`,
    shadowColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    /* CSS SHADOW FOR Android */
    elevation: 3
  },
  country: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: `${process.env.PRIMARY_GREEN_COLOR}`,
  },
  rate: {
    flex: 1,
    fontSize: 11,
    color: `${process.env.WHITE_COLOR}`,
  }
})
