import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text>This is a contact page !</Text>
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