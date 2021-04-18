import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AddMedicine from '../screens/daytoday/AddMedicine'
import AddMedicineToInvetory from '../screens/daytoday/AddMedicineToInvetory'
import Daytoday from '../screens/daytoday/Daytoday'
import DaytoDayNavigation from '../screens/daytoday/DaytoDayNavigation'

const Stack = createStackNavigator()

export default function DaytodayStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='daytoday'
            component={DaytoDayNavigation}
            options={{title: 'Día a día'}}
            />
            <Stack.Screen
                name='addMedicine'
                component={AddMedicine}
            />
            <Stack.Screen
                name='addMedicineToInvetory'
                component={AddMedicineToInvetory}
            />
        </Stack.Navigator>        

    )
}
