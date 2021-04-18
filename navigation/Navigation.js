import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack';
import FavoriteStack from './FavoriteStack';
import DaytodayStack from './DaytodayStack';
import SearchStack from './SearchStack';
import HomeStack from './HomeStack';

export default function Navigation() {

    const Tab = createMaterialTopTabNavigator()

    const screenOptions = (route, color) => 
    {
        let iconName         
        switch (route.name) 
        {
            case 'home':                
                iconName = "home"
                break;
            case 'search':
                iconName = "search"
                break;
            case 'daytoday':
                iconName = "list-1"
                break;
            case 'favorite':
                iconName = "heart"
                break;
            case 'account':
                iconName = "person"
                break;       
                   
        }
        return (            
            <Icon
            type="fontisto"
            name = {iconName} 
            size = {15} 
            color = {color}
            marginTop ={10}
            />                            
        )        
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = "home"
                tabBarOptions = {
                    {
                        inactiveTintColor : "#07a5cf",
                        activeTintColor : "#042b41",
                        showIcon: true,
                        showLabel: false,
                        tabStyle: {marginTop: 15}                        
                        //style: { backgroundColor: '#c70606' }
                    }
                }
                screenOptions = {( {route} ) => ({
                     tabBarIcon : ({ color }) => screenOptions(route, color)
                    })}
                    
            >                
                <Tab.Screen 
                    name= 'home'
                    component = {HomeStack}
                    options= {{title: 'Inicio'}}
                />
                <Tab.Screen
                    name = 'search'
                    component = {SearchStack}
                    options= {{title: 'Buscar'}}
                />
                <Tab.Screen 
                    name = 'daytoday' 
                    component = {DaytodayStack} 
                    options= {{title: 'Día a día'}}
                />
                <Tab.Screen
                    name= 'favorite'
                    component = {FavoriteStack}
                    options= {{title: 'Favoritos'}}
                />                                
                <Tab.Screen 
                    name = 'account'
                    component = {AccountStack}
                    options={{title: 'Cuenta'}}
                />                
            </Tab.Navigator>
        </NavigationContainer>
    )
}


