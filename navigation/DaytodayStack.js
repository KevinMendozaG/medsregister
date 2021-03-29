import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Daytoday from '../screens/Daytoday'

const Stack = createStackNavigator()

export default function DaytodayStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='daytoday'
            component={Daytoday}
            options={{title: 'Día a día'}}
            />
        </Stack.Navigator>        

    )
}
