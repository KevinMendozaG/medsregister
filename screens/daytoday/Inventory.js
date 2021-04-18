import React, { useEffect, useState, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import { getMedicines } from '../../utils/actions'
import Loading from '../../components/Loading'
import ListInvetory from '../../components/daytoday/ListInvetory'

export default function Inventory({ navigation }) {

    const [user, setUser] = useState(null)
    const [medicine, setMedicine] = useState([])
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadFavorite, setReloadFavorite] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback( () => {
            async function getData(){
                setLoading(true)
                const response = await getMedicines('medicine')
                if (response.statusResponse) {
                    setMedicine(response.medicines)
                }
                const responseInvetory = await getMedicines('inventory')
                if (responseInvetory.statusResponse) {
                    setInventory(responseInvetory.medicines)
                }
                
                console.log(inventory)
                setLoading(false)                
            }
            getData() 
            setReloadFavorite(false)               
        }, [reloadFavorite])        
    )

    return (user ? (           
        <View style={styles.viewBody}>
            <ListInvetory
                navigation= {navigation}
                inventory = {inventory}
                setReloadFavorite = {setReloadFavorite}
            />
            <Icon
                type= 'feather'
                name= 'plus'
                color= '#f9b30b'
                reverse
                containerStyle={styles.btnContainer}
                onPress = {() => navigation.navigate('addMedicineToInvetory', {medicine})}
            />
             <Loading isVisible ={loading} text='Cargando medicamentos...'/> 
        </View>
        ): (
            <Text>Debes de loguearte para agregar medicamentos...</Text>
        )       
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',         
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    },

    viewBody:{
        flex: 1
    }
})
