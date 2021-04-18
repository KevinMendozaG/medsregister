import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocumentById } from '../../utils/actions'

export default function AddMedicineForm({toastRef, setLoading, navigation, editMode, id}) {

    const [formData, setFormData] = useState(defaultFormValues())
    const [state, setState] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)
    const [errorName, setErrorName] = useState(null)
    const [errorQuantity, setErrorQuantity] = useState(null)
    const [errorPeriod, setErrorPeriod] = useState(null)
    const [errorManufacturer, setErrorManufacturer] = useState(null)
    const [errorDose, setErrorDose] = useState(null)
    const [newFormData, setNewFormData] = useState({})
    
    useEffect(() => {
        if (editMode) {
            getDocument(id)  
        }
    }, [])

   async function getDocument (id){
        const response = await getDocumentById('medicine', id)
        setLoading(true)
        if (response.statusResponse) {
            setNewFormData({...response.document, id: response.document.id})
            
        }
        setLoading(false)         
   }    

    const onChange = (e, type) =>{
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    const addMedicine = async () => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const medicine = {
            name: formData.name,
            quantity: formData.quantity,
            manufacturer: formData.manufacturer,
            createdBy: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId('medicine', medicine)
        setLoading(false)
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show('Error al grabar el medicamento, por favor intente más tarde')
            console.log(responseAddDocument.error)            
            return
        }
        navigation.navigate('daytoday')
    }

    const editMedicine = async () => {
        if (!validForm()) {
            return
        }
        clearErrors()
                          
        const updateMedicine = {
            name: formData.name,
            quantity: formData.quantity,
            manufacturer: formData.manufacturer
        }
        const responseUpdateDocument = await updateDocumentById('medicine', newFormData.id, updateMedicine )
        if (!responseUpdateDocument.statusResponse) {
            toastRef.current.show('Error al actualizar el medicamento, por favor intente más tarde')
            console.log(responseAddDocument.error)            
            return
        }
        navigation.navigate('daytoday')                                                        
    }

    const validForm = () =>{
        let isValid = true
        clearErrors()
        if (isEmpty(formData.name)) {
            setErrorName(editMode?'Los datos son iguales':'Debes ingresar el nombre del medicamento')
            isValid = false
        }
        if (isEmpty(formData.quantity)) {
            setErrorQuantity(editMode? 'Los datos son iguales':'Debes ingresar la cantidad')
            isValid = false
        }       
        return isValid
    }

    const clearErrors = () =>{
        setErrorQuantity('')
        setErrorName('')
        setErrorPeriod('')
    }
    return (
        <View style ={styles.viewForm}>
            <Input
                placeholder= 'Nombre del medicamento'
                onChange = {    (e) => onChange(e, 'name')}
                errorMessage = { errorName }
                defaultValue= {newFormData.name}
            />
            <Input
                placeholder= 'Cantidad de medicamentos'
                keyboardType = 'number-pad'
                onChange = {(e) => onChange(e, 'quantity')}
                errorMessage = { errorQuantity }
                defaultValue= {newFormData.quantity}
            />               
            <Input
                placeholder= 'Fabricante'   
                onChange = {(e) => onChange(e, 'manufacturer')}
                errorMessage = { errorManufacturer }
                defaultValue= {newFormData.manufacturer}
            />                       
            <Button
                title={editMode ? 'Actualizar datos' :'Agregar medicamento'}
                onPress= {editMode ? editMedicine : addMedicine}
                buttonStyle = {styles.btnAdd}  
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        marginHorizontal: 10,
        marginTop: 20
    },

    btnAdd: {
        margin: 20,
        backgroundColor: '#f9b30b',
        borderRadius: 20
    },
    
    alarmView:{
        flexDirection: 'row'
    },

    text:{
        fontSize: 17
    }
})

const defaultFormValues = () => {
    return {
        name: '',                
        quantity: 0,
        manufacturer: ''                   
    }

}


