import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/bottom_tab_navigator';

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    color: "black",
  },
});
