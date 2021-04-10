import React,{ useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import { Button } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import { getCurrentLocation } from '../utils/helpers'
import Modal from '../components/Modal'


export default function Search() {
    const [newRegion, setNewRegion] = useState(null)
    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getCurrentLocation()
                if(response.status){
                    setNewRegion(response.location)
                }
            })()
        }, [])
    )
    // useEffect(() => {
    //     (async() => {
    //         const response = await getCurrentLocation()
    //         if(response.status){
    //             setNewRegion(response.location)
    //         }
    //     })()
    // }, [])

    return (
        <View>
            <MapView
               style={styles.mapStyle}
               initialRegion={newRegion}
                showsUserLocation={true}
            >
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a65273"
    },
})
