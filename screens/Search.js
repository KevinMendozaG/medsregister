import React,{ useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { Button, Input } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { isEmpty, map, size } from 'lodash'
import Toast from 'react-native-easy-toast'

import { getCurrentLocation } from '../utils/helpers'


export default function Search() {
    const toastRef = useRef()

    const [newRegion, setNewRegion] = useState(null)
    const [pharmacies, setPharmacies] = useState([])
    const [latitudeIni, setLatitudeIni] = useState(null)
    const [longitudeIni, setLongitudeIni] = useState(null)
    const [searchParameter, setSearchParameter] = useState("")
    const [errorSearch, setErrorSearch] = useState("")
    const [pharmacy, setPharmacy] = useState([])
    const [isSeaarch, setIsSeaarch] = useState(false)

    

    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()

            if(response.status){
                setNewRegion(response.location)
                setLatitudeIni(response.location.latitude)
                setLongitudeIni(response.location.longitude)
            }
        })()
    }, [])

    useEffect(() => {
        (async() => {
            const url= urlParameters(latitudeIni, longitudeIni, 1000, 'pharmacy', 'AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI')
                fetch(url).then((data) => data.json()).then((res) =>{
                    setPharmacies(res.results)
                })
        })()
    }, [])
    
    const places = () =>{
        setPharmacy([])
        const url= urlParameters(newRegion.latitude, newRegion.longitude, 1000, 'pharmacy', 'AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI')
        fetch(url).then((data) => data.json()).then((res) =>{
            setPharmacies(res.results)
            console.log(isEmpty(pharmacy))
        })
    }

    const searchName = (name) => {
        setErrorSearch("")
        setPharmacy([])
        if(isEmpty(name)){
            setErrorSearch("Debes ingresar el nombre de la farmacía")
            return
        }
        const url= urlParameters(newRegion.latitude, newRegion.longitude, 1000, 'pharmacy', 'AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI')
        fetch(url).then((data) => data.json()).then((res) =>{
            map(res.results, (item) =>{
                if (name===item.name) {
                    setPharmacy(item)
                    console.log("yeaaaaa")
                    setPharmacy(item)
                    console.log(pharmacy)
                }
            })

            if ( isEmpty(pharmacy) ) {
                toastRef.current.show("Ha ocurrido un error en la busqueda, intenta mas tarde.", 3000)
                return
            }
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

    const onChange = (e) => {
        setSearchParameter(e.nativeEvent.text)
    }

    return (
        <View>
            {latitudeIni ?<MapView
               style={styles.mapStyle}
               initialRegion={newRegion}
                showsUserLocation={true}
            >
                { 
                !isEmpty(pharmacy) ? 
                    <Marker
                    coordinate= {{
                        latitude: pharmacy.geometry.location.lat,
                        longitude: pharmacy.geometry.location.lng,
                        title: pharmacy.name
                    }}
                >
                <Callout>
                    <View>
                        <Text>{pharmacy.name}</Text>

                    </View>
                </Callout>
                </Marker> :
                pharmacies.map((element, i) => (
                        <Marker
                            key={i}
                            coordinate= {{
                                latitude: element.geometry.location.lat,
                                longitude: element.geometry.location.lng,
                                title: element.name
                            }}
                        >
                        <Callout>
                            <View>
                                <Text>{element.name}</Text>

                            </View>
                        </Callout>
                        </Marker>    
                ))
                }
            </MapView>: null}
            <Input
                containerStyle={styles.input}
                placeholder= "Ingresa el nombre de la farmacía..."
                onChange= {(e) => onChange(e)}
                errorMessage={errorSearch}
            />
            <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Buscar"
                onPress={() => searchName(searchParameter)}
            />
            <Button
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            title="Mostrar farmacias cercanas"
                onPress={() => places()}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 500
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
    input:{
        marginTop: 10,
        width: "100%",
    },
    btnContainer: {
        marginTop: 5,
        width: "95%",
        alignSelf:"center"
    },
    btn: {
        backgroundColor: "#16a69f"
    },
})
