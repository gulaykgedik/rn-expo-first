import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Link from '../components/Link'

const HomePage = () => {
  return (
    <View style={{ margin:"auto", gap: 20 }}>
      <Link to="LocationPage">
        LocationPage
      </Link>
      <Link to="AVPage">
        Audio/Video Page
      </Link>
      <Link to="FilePage">
        Filesystem Page
      </Link>
      <Link to="CameraPage">
        Camera Page
      </Link>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({})