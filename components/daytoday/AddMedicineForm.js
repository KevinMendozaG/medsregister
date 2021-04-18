import React, { useState } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Switch } from 'react-native-gesture-handler'

export default function AddMedicineForm() {

    const [formData, setFormData] = useState(defaultFormValues())
    const [state, setState] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onChange = (e, type) =>{
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    {
        console.log(formData.name)
    }

    return (
        <View style ={styles.viewForm}>
            <Input
                placeholder= 'Nombre del medicamento'
                onChange = {(e) => onChange(e, 'name')}
            />
            <Input
                placeholder= 'Cantidad de medicamentos'
                keyboardType = 'number-pad'
                onChange = {(e) => onChange(e, 'quantity')}

            />               
            <Input
                placeholder= 'Fabricante'   
                onChange = {(e) => onChange(e, 'manufacturer')}
             
            />
            <Input
                placeholder= 'Frecuencia en minutos de la toma del medicamento.'
                onChange = {(e) => onChange(e, 'period')}
                
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
                //onPress= {addRestaurant}
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
        alarm: 0
    }

}


