import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home"/>
        <Stack.Screen name="search"/>
        <Stack.Screen name="vehicle-selection"
        options={{ headerShown: false }}/>
        <Stack.Screen name="finding_driver"/>
        <Stack.Screen name="trip"/>
        <Stack.Screen name="select-voucher"/>
    </Stack>
  )
}

export default HomeLayout