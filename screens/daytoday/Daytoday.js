import firebase from 'firebase'
import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View  } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { getMedicines } from '../../utils/actions'

import Loading from '../../components/Loading'
import ListMedicines from '../../components/daytoday/ListMedicines'


export default function Daytoday({ navigation }) {

    const [user, setUser] = useState(null)
    const [medicine, setMedicine] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        React.useCallback( () => {
            async function getData(){
                setLoading(true)
                const response = await getMedicines()
                if (response.statusResponse) {
                    setMedicine(response.medicines)
                }
                setLoading(false)
            }
            getData()                
        }, [])
        
    )

    return (
        user ? (
        <View style={styles.viewBody}>
             <ListMedicines medicines = { medicine }/> 
            <Icon
                type= 'feather'
                name= 'plus'
                color= '#f9b30b'
                reverse
                containerStyle={styles.btnContainer}
                onPress = {() => navigation.navigate('addMedicine')}
            />
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
