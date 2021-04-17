import { useFocusEffect } from '@react-navigation/core'
import { size } from 'lodash'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListFavorites from '../components/favorite/ListFavorites'

import Loading from '../components/Loading'
import { getCurrentUser, getFavorites } from '../utils/actions'

export default function Favorite() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const user= getCurrentUser()
                const response = await getFavorites(user.uid)
                if (response.statusResponse){
                    setFavorites(response.favorites)
                }
                setLoading(false)
                console.log(favorites)
            }
            getData()
        }, [])
    )

    return (
        <View style={styles.viewBody}>
            {
                size(favorites) > 0 ? (
                    <ListFavorites
                        favorites={favorites}
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
    }
})
