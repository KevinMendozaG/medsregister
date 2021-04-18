import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import InvetoryForm from '../../components/daytoday/InvetoryForm'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'

export default function AddMedicineToInvetory({ navigation, route }) {
    const { medicine, id, editMode } = route.params    
    const [loading, setLoading] = useState(false)
    const toastRef = useRef()

    useEffect(() => {
        if (editMode == false) {
            navigation.setOptions({title: 'Agregar a Inventario'})
        }else{
            navigation.setOptions({title: 'Editar Inventario'})
        }
    }, [])

    return (
        <ScrollView>
            <InvetoryForm 
                medicine= {medicine}
                navigation = {navigation}
                toastRef = {toastRef}
                setLoading = {setLoading}  
                editMode = {editMode}              
                id= {id}
            />
            <Loading isVisible ={loading} text={editMode?'Actualizando':'Creando inventario'}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
