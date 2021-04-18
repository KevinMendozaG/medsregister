import React, {useRef, useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AddMedicineForm from '../../components/daytoday/AddMedicineForm'

export default function AddMedicine({ navigation, route }) {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    const { id, editMode } = route.params
    useEffect(() => {
        if (editMode == false) {
            navigation.setOptions({title: 'Agregar medicamentos'})
        }else{
            navigation.setOptions({title: 'Editar medicamento'})
        }
    }, [])
    
    return (
        <ScrollView>
            <AddMedicineForm
                toastRef= {toastRef}   
                setLoading= { setLoading }
                navigation= {navigation}
                editMode = { editMode }
                id = {id}
            />
            <Loading isVisible ={loading} text={editMode? 'Actualizando' : 'Creando medicine'}/>
            <Toast ref={toastRef} position='center' opacity= {0.9}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
