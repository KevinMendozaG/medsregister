import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Account from '../screens/Account'

const Stack = createStackNavigator()

export default function FavoriteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='account'
            component={Account}
            options={{title: 'Favorito'}}
            />
        </Stack.Navigator>        

    )
}
