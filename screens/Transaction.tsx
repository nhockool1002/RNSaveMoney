import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Transaction() {
  return (
    <View style={styles.container}>
      <Text>This is a transaction page !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    fontWeight: 'bold'
  }
})