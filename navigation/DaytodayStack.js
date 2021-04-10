import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AddMedicine from '../screens/daytoday/AddMedicine'
import Daytoday from '../screens/daytoday/Daytoday'

const Stack = createStackNavigator()

export default function DaytodayStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='daytoday'
            component={Daytoday}
            options={{title: 'Día a día'}}
            />
            <Stack.Screen
                name='addMedicine'
                component={AddMedicine}
                options = {{title: 'Agregar medicamento'}}
            />
        </Stack.Navigator>        

    )
}
