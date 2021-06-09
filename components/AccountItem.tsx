import React from 'react';
import 'intl'
import 'intl/locale-data/jsonp/en'
import {formatDate} from '../helper/utils'

import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import {getMinimumFractionDigits} from '../helper/utils'
import RemoveImage from '../assets/remove.png'
import EditImage from '../assets/edit.png'

export default function AccountItem(props: any) {
  const { item, deleteAccount } = props
  const createThreeButtonAlert = (accountName: string, id: string) =>
    Alert.alert(
      'Account ' + accountName,
      'Are you sure ?',
      [
        { text: "OK", onPress: () => deleteAccount(id) },
        {
          text: "Cancel",
          style: "cancel"
        },
      ]
    );
  const formatter = (unit: string) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: unit,
    minimumFractionDigits: getMinimumFractionDigits(unit)
  })
  return <View style={styles.item}>
    <TouchableOpacity style={styles.removeWrap} onPress={() => createThreeButtonAlert(item.accountName, item.id)}>
      <Image source={RemoveImage} style={styles.imageRemove} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.editWrap}>
      <Image source={EditImage} style={styles.imageEdit} />
    </TouchableOpacity>
    <View style={styles.leftBox}>
      <Text style={styles.name}>{item.accountName}</Text>
      <Text style={styles.value}>
        {formatter(item.currencyUnit).format(parseFloat(item.amount))}
      </Text>
    </View>
    <Text style={styles.createAt}>{formatDate(item.createAt)}</Text>
</View>
}

AccountItem.propTypes = {
  item: PropTypes.any,
  deleteAccount: PropTypes.func
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    flex: 1,
    flexDirection: 'row',
    /* CSS SHADOW FOR iOS */
    backgroundColor: `${process.env.BLACK_COLOR}`,
    shadowColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    /* CSS SHADOW FOR Android */
    elevation: 5
  },
  leftBox: {
    flex: 4
  },
  name: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: `${process.env.WHITE_COLOR}`,
  },
  createAt: {
    flex: 2,
    color: `${process.env.WHITE_COLOR}`,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    color: `${process.env.RED_COLOR}`
  },
  removeWrap: {
    flex: 1
  },
  editWrap: {
    flex: 1
  },
  imageRemove: {
    width: 32,
    height: 32
  },
  imageEdit: {
    width: 32,
    height: 32
  }
})