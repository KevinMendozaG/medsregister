import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Favorite from '../screens/Favorite'

const Stack = createStackNavigator()

export default function FavoriteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='favorite'
            component={Favorite}
            options={{title: 'Favoritos'}}
            />
        </Stack.Navigator>        

    )
}
