import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router';

const ActivitiesLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="activities"/>
        <Stack.Screen name="history/[history_id]"/>
        <Stack.Screen name="ongoing/[ongoing_id]"/>
    </Stack>
  )
}

export default ActivitiesLayout