import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Daytoday from './Daytoday'
import Inventory from './Inventory'


export default function DaytoDayNavigation() {

    const Tab = createMaterialTopTabNavigator()

    return (
            <Tab.Navigator tabBarPosition = 'bottom'>
                <Tab.Screen
                    name = 'daytoday'
                    component = {Daytoday}
                    options = {{title: 'Día a día'}}
                />
                <Tab.Screen
                    name = 'inventory'
                    component = {Inventory}
                    options = {{title: 'Inventario'}}
                />
                
            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})
