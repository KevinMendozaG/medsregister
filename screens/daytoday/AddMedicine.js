import React, {useRef, useState} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AddMedicineForm from '../../components/daytoday/AddMedicineForm'

export default function AddMedicine({ navigation }) {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <ScrollView>
            <AddMedicineForm
                toastRef= {toastRef}   
                setLoading= { setLoading }
                navigation= {navigation}
            />
            <Loading isVisible ={loading} text='Creando medicine'/>
            <Toast ref={toastRef} position='center' opacity= {0.9}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
