import React,{ useState, useRef } from 'react'
import { FlatList, StyleSheet, View,TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { Image, Icon } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

import { removeFavorite } from '../../utils/actions'
import Loading from '../Loading'


export default function ListFavorites({ favorites, setReloadFavorite }) {
    const toastRef = useRef()

    const [loading, setLoading] = useState(false)

    return (
        <View>
            <FlatList
                data= {favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(favorite, index) => (
                    <Favorite favorite={favorite} setLoading={setLoading} toastRef={toastRef} setReloadFavorite={setReloadFavorite}  />
                )}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Eliminando Favorito..."}/>
        </View>
    )
}



function Favorite({ favorite, setLoading, toastRef, setReloadFavorite }) { 
    const { address, idUser, latitude, longitude, pharmacyName, userName, icon, id, idFavorite } = favorite.item

    return (

            <View style={styles.viewFavorite}>
                <View style={styles.viewFavoriteImage}>
                <Image
                    resizeMode="cover"
                    PlaceholderContent= {<ActivityIndicator color="#fff"/>}
                    source={{uri: icon }}
                    style={styles.imageFavorite}
                />
                </View>
                <View >
                    <Text style={styles.favoriteTitle}> {pharmacyName}</Text>
                    <Text style={styles.favoriteInformation}> {address}</Text>
                </View>
                <Icon
                        type= "fontisto"
                        name= "close-a"
                        iconStyle={styles.icon}
                        containerStyle={styles.btn}
                        onPress={() => deleteFavorite(idUser, idFavorite, setLoading, toastRef, setReloadFavorite)}
                    />
            </View>

    )
}

const deleteFavorite = async( idUser, idFavorito, setLoading, toastRef, setReloadFavorite ) => {
    setLoading(true)   
    const response = await removeFavorite(idUser, idFavorito)
    setLoading(false)
    if(!response.statusResponse){
        toastRef.current.show("Error al eliminar favorito, por favor intenta más tarde.", 3000)
        return
    }
    setReloadFavorite(true)
}

const styles = StyleSheet.create({
    viewFavorite: {
        flexDirection: "row",
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e4546c"
    },
    viewFavoriteImage: {
        marginRight: 15
    },
    imageFavorite: {
        width: 90,
        height: 90
    },
    favoriteTitle: {
        fontWeight: "bold"
    },
    favoriteInformation: {
        paddingTop: 2,
        color: "grey"
    },
    favoriteDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    },
    icon: {
        color: "#94cfc8",
    },
    btn: {
        position: "absolute",
        right: 0
    }
})
