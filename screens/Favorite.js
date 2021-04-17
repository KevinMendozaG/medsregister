import { useFocusEffect } from '@react-navigation/core'
import { size } from 'lodash'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListFavorites from '../components/favorite/ListFavorites'

import Loading from '../components/Loading'
import { getCurrentUser, getFavorites, isUserLogged, isUserLogged1 } from '../utils/actions'

export default function Favorite({ navigation }) {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadFavorite, setReloadFavorite] = useState(false)
    const [isLogged, setIsLogged] = useState(null)

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                const logged = isUserLogged1() 
                setIsLogged(logged)
                if(!logged){
                    return
                }
                setLoading(true)
                const user= getCurrentUser()
                const response = await getFavorites(user.uid)
                if (response.statusResponse){
                    setFavorites(response.favorites)
                }
                setLoading(false)
            }
            getData()
            setReloadFavorite(false)
        }, [reloadFavorite])
    )

    return (
        <View style={styles.viewBody}>
            {
            !isLogged 
            ? <View style={styles.notLoggedView}>
               <Text 
                        style={styles.mustLoginText}
                        onPress={() => navigation.navigate("account")}
                    >
                        Para ver los favoritos es necesario estar logueado.{" "}
                        <Text style={styles.loginText}>
                            Pusla AQUÍ para iniciar sesión.
                        </Text>
                    </Text>
              </View>
            : 
            size(favorites) > 0 ? (
                <ListFavorites
                    favorites={favorites} setReloadFavorite={setReloadFavorite}
                />
            ) : (
                <View style={styles.notFoundView}>
                    <Text style={styles.notFoundText}>No tienes favoritos registrados.</Text>
                </View>
            )
            }
            <Loading isVisible={loading} text={"Cargando Favoritos"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex:1,
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    notLoggedView: {
        alignItems: "center",
        margin: 20,
    },
    mustLoginText: {
        textAlign: "center",
        color: "#042c42",
        padding: 20,
    },
    loginText: {
        fontWeight: "bold"
    },
})
