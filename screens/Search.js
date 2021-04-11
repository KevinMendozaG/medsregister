import React,{ useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import MapView from 'react-native-maps'
import { Button } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import { getCurrentLocation } from '../utils/helpers'
import Modal from '../components/Modal'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


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
    const places = async() =>{
        const url= urlParameters(newRegion.latitude, newRegion.longitude, 1000, 'pharmacy', 'AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI')
        fetch(url).then((data) => data.json()).then((res) =>{
            console.log(res)
        })
    }

    const urlParameters = (latitude, longitude, radius, type, API) =>{
        const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        const location= `location=${latitude},${longitude}&radius=${radius}`
        const typeData = `&types=${type}`
        const key = `&key=${API}`
        const path= `${url}${location}${typeData}${key}`
        console.log(path)
        return path
    }
    return (
        <View>
            <MapView
               style={styles.mapStyle}
               initialRegion={newRegion}
                showsUserLocation={true}
            >
            </MapView>
            <Button
            title="Buscar"
                onPress={places}
            />
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
