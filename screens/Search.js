import React,{ useEffect, useState, useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { Button, Input } from 'react-native-elements'
import { isEmpty, map, size } from 'lodash'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import uuid from 'random-uuid-v4'

import { getCurrentLocation } from '../utils/helpers'
import { addDocumentWithoutId, checkIfFavorite, getCurrentUser, getFavorites } from '../utils/actions'
import Loading from '../components/Loading'


export default function Search() {
    const toastRef = useRef()

    const [newRegion, setNewRegion] = useState(null)
    const [pharmacies, setPharmacies] = useState([])
    const [latitudeIni, setLatitudeIni] = useState(null)
    const [longitudeIni, setLongitudeIni] = useState(null)
    const [searchParameter, setSearchParameter] = useState("")
    const [errorSearch, setErrorSearch] = useState("")
    const [pharmacy, setPharmacy] = useState([])
    const [loading, setLoading] = useState(false)

    

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
        })
    }

    const searchName = async(name) => {
        setErrorSearch("")
        setPharmacy([])
        setPharmacies([])
        if(isEmpty(name)){
            setErrorSearch("Debes ingresar el nombre de la farmacía")
            return
        }
        const url= urlParameters(newRegion.latitude, newRegion.longitude, 2000, 'pharmacy', 'AIzaSyDbScSU4X5B5tgzQiyNFA3ROIr0k6aiYRI')
        await fetch(url).then((data) => data.json()).then((res) =>{
            map(res.results, (item) =>{
                if (name===item.name) {
                    setPharmacy(item)
                }
            })
        })
        // if ( isEmpty(pharmacy) ) {
        //     toastRef.current.show("Ha ocurrido un error en la busqueda, intenta mas tarde.", 3000)
        //     return
        // }
    }

    const urlParameters = (latitude, longitude, radius, type, API) =>{
        const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        const location= `location=${latitude},${longitude}&radius=${radius}`
        const typeData = `&types=${type}`
        const key = `&key=${API}`
        const path= `${url}${location}${typeData}${key}`
        return path
    }

    const onChange = (e) => {
        setSearchParameter(e.nativeEvent.text)
    }

    const addFavorite = async( element ) => {
        const { name, vicinity, latitude= element.geometry.location.lat, longitude= element.geometry.location.lng, icon  } = element
        setLoading(true)
        const user = getCurrentUser()

        const favorite = {
            idFavorite: uuid(),
            userName: user.displayName,
            idUser: user.uid,
            pharmacyName: name,
            address: vicinity,
            icon,
            latitude,
            longitude
        }
        const responseCheckIfFavorite = await checkIfFavorite(favorite.idUser, favorite.pharmacyName)
        if(responseCheckIfFavorite.isFavorite){
            toastRef.current.show("La farmacia esta actualmente en favoritos.", 3000)
            setLoading(false)
            return
        }

        const responseAddDocument = await addDocumentWithoutId("favorites", favorite)
        if(!responseAddDocument.statusResponse) {
            setLoading(false)
            toastRef.current.show("Error al agregar favorito, por favor intenta más tarde.", 3000)
            return
        }
        setLoading(false)
    }

    return (
        <KeyboardAwareScrollView>
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
                <Callout
                    onPress={addFavorite}
                >
                    <View>
                        <Text>{pharmacy.name}</Text>
                        <Text>Dirección: {pharmacy.vicinity}</Text>
                        <Text>Toca AQUI agregar a favoritos</Text>
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
                        <Callout
                            onPress={() => addFavorite(element)}
                        >
                            <View>
                                <Text style={styles.title}>{element.name}</Text>
                                <Text>Dirección: {element.vicinity}</Text>
                                <Text style={styles.addFavorite}>Toca AQUI agregar a favoritos</Text>
                            </View>
                        </Callout>
                        </Marker>    
                ))
                }
                <Marker
                    coordinate={{
                        latitude: newRegion.latitude,
                        longitude: newRegion.longitude
                    }}
                >
                    <View>
                        <Image style={{width: 40, height: 40}} source={require("../assets/marker.png")}/>
                    </View>
                </Marker>
            </MapView>: null}
            
            
            <Button
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            title="Mostrar farmacias cercanas"
                onPress={() => places()}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Agregando a favorito"}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 500,
        marginBottom:10,
        marginTop: 10
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
        width: "95%"
    },
    btnContainer: {
        width: "95%",
        alignSelf:"center"
    },
    btn: {
        backgroundColor: "#16a69f"
    },
    title: {
        fontWeight: "bold"
    },
    addFavorite: {
        color: "#e4546c"
    }
})
