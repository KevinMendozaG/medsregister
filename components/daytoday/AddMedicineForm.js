import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Switch } from 'react-native-gesture-handler'

import { addDocumentWithoutId, getCurrentUser } from '../../utils/actions'

export default function AddMedicineForm({toastRef, setLoading, navigation}) {

    const [formData, setFormData] = useState(defaultFormValues())
    const [state, setState] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)
    const [errorName, setErrorName] = useState(null)
    const [errorQuantity, setErrorQuantity] = useState(null)
    const [errorPeriod, setErrorPeriod] = useState(null)
    const [errorManufacturer, setErrorManufacturer] = useState(null)
    const [errorDose, setErrorDose] = useState(null)
    

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            alarm: isEnabled,
            manufacturer: formData.manufacturer,
            period: formData.period,
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

    const validForm = () =>{
        let isValid = true
        clearErrors()
        if (isEmpty(formData.name)) {
            setErrorName('Debes ingresar el nombre del medicamento')
            isValid = false
        }
        if (isEmpty(formData.quantity)) {
            setErrorQuantity('Debes ingresar la cantidad')
            isValid = false
        }
        if (isEmpty(formData.period)) {
            setErrorPeriod('Debes ingresar cada cuanto te debes tomar el medicamento')
            isValid = false
        }
        if (isEmpty(formData.dose)) {
            setErrorPeriod('Debes ingresar la dosis')
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
                onChange = {(e) => onChange(e, 'name')}
                errorMessage = { errorName }
            />
            <Input
                placeholder= 'Cantidad de medicamentos'
                keyboardType = 'number-pad'
                onChange = {(e) => onChange(e, 'quantity')}
                errorMessage = { errorQuantity }
            />               
            <Input
                placeholder= 'Fabricante'   
                onChange = {(e) => onChange(e, 'manufacturer')}
                errorMessage = { errorManufacturer }
            />
            <Input
                placeholder= 'Frecuencia en minutos de la toma del medicamento.'
                onChange = {(e) => onChange(e, 'period')}
                errorMessage = { errorPeriod }
            />
            <Input
                placeholder= 'Dosis'
                onChange = {(e) => onChange(e, 'dose')}
                errorMessage = { errorDose }
                keyboardType = 'number-pad'
            />
            <View style = {styles.alarmView}>
            <Text style = {styles.text}>¿Activar alarma en las noches?</Text>
            <Switch
                trackColor={{ true: "#f9b30b", false: "#042b41" }}
                thumbColor={"#f9b30b" }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
           </View>
            
            <Button
                title='Agregar medicamento'
                onPress= {addMedicine}
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
        period: 0,
        quantity: 0,
        manufacturer: '',
        alarm: 0,
        dose: ''
    }

}


