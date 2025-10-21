import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomePage from '../pages/HomePage';
import LocationPage from '../pages/LocationPage';
import FilePage from '../pages/FilePage';
import CameraPage from '../pages/CameraPage';
import AVPage from '../pages/AVPage';
import VideoPage from '../pages/VideoPage';

const Stack = createNativeStackNavigator();
const RootNavigatior = () => {
  return (
   <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="LocationPage" component={LocationPage} />
      <Stack.Screen name="FilePage" component={FilePage} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen name="AVPage" component={AVPage} /> 
      <Stack.Screen name="VideoPage" component={VideoPage} />
   </Stack.Navigator>
  )
}

export default RootNavigatior