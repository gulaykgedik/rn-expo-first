import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Link = (props) => {

    const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(props.to || 'HomePage')}
      style={{
         padding: 10, 
         backgroundColor: props.bg || "lightblue", 
         borderRadius: 5,
         borderColor: props.bc || "gray",
         borderWidth: 1, }}
    >
      <Text 
        style={{ color: props.tc || "black", textAlign: "center", fontSize: 16 }}
      >{props.children}</Text>
    </TouchableOpacity>
  )
}

export default Link

const styles = StyleSheet.create({})