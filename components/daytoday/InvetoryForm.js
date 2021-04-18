import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isEmpty } from 'lodash'
import { Button, Icon, CheckBox, Input } from 'react-native-elements'
import Modal from '../Modal'
import DisplayListMedicines from './DisplayListMedicines'
// import { TouchableOpacity } from 'react-native'

import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocumentById} from '../../utils/actions'


export default function InvetoryForm({medicine, navigation, toastRef, setLoading, editMode, id}) {

    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [renderComponent, setRenderComponent] = useState(
    <DisplayListMedicines 
        medicine = {medicine} 
        setFormData = {setFormData} 
        setIsVisible = {setIsVisible}
    />)
    const [formData, setFormData] = useState(defaultFormValues())
    const [isVisible, setIsVisible] = useState(false);
    const [errorDose, setErrorDose] = useState(null)
    const [errorPeriod, setErrorPeriod] = useState(null)
    const [newFormData, setNewFormData] = useState({})

    useEffect(() => {
        if (editMode) {
            getDocument(id)              
        }
    }, [])

   async function getDocument (id){
        const response = await getDocumentById('inventory', id)
        setLoading(true)
        if (response.statusResponse) {
            setNewFormData({...response.document, id: response.document.id})   
            setFormData({...formData, name: newFormData.name})         
        }
        setLoading(false)         
   } 
     
    const days = [
        {id: 0, day: 'Lunes'}, 
        {id: 1, day: 'Martes'},
        {id: 2, day: 'Miercoles'},
        {id: 3, day:'Jueves'},
        {id: 4, day: 'Vienres'},
        {id: 5, day: 'Sabado'},
        {id: 6, day: 'Domingo'}]


    const addDays = (index) => {
        const data = days
        const i = days.findIndex(x=>x.id === index)
        data[i].checked=!data[i].checked
        
    }

    const onChange = (e, type) =>{
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }
    const clearErrors = () =>{
        setErrorDose('')
        setErrorPeriod('')
    }
    const validForm = () =>{
        let isValid = true
        clearErrors()
       
        if (isEmpty(formData.period)) {
            setErrorPeriod('Debes ingresar cada cuanto te debes tomar el medicamento')
            isValid = false
        }
        if (isEmpty(formData.dose)) {
            setErrorDose('Debes ingresar la dosis')
            isValid = false
            
        }

        return isValid
    }

    const editInventory = async () => {
        const updateMedicine = {
            name: formData.name,
            quantity: formData.quantity,
            manufacturer: formData.manufacturer
        }
        console.log('Editar')
        const responseUpdateDocument = await updateDocumentById('inventory', newFormData.id, updateMedicine )
        if (!responseUpdateDocument.statusResponse) {
            // toastRef.current.show('Error al actualizar el inventario, por favor intente más tarde')
            console.log(responseUpdateDocument.error)            
            return
        }
        navigation.navigate('inventory') 
    }
    const addInventory = async () => {
        if (!validForm()) {
            return
        }
        setLoading(true)
        const invetory = {
            name: formData.name,
            period: formData.period,
            dose: formData.dose,
            days: formData.days,            
            id: formData.id,
            createdBy: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId('inventory', invetory)
        setLoading(false)
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show('Error al grabar el medicamento, por favor intente más tarde')
            console.log(responseAddDocument.error)            
            return
        }
        navigation.navigate('inventory')
        
    }

    return (    
    <View style ={styles.viewForm}>        
        <Text 
            onPress ={() => setIsVisible(true)}
            style = {styles.listStyle}
        >            
             {
                 editMode ? newFormData.name :
                formData.name ? formData.name : 'Selecciona medicamentos..'
             }
        </Text>
        {/* <Text>Selecciona los días que tomara los medicamentos</Text>
        {
            map(days, (d,index)=>(
                <TouchableOpacity
                    key= {index}
                    onPress = {()=>addDays(index)}
                    style= {{flexDirection: 'row', alignItems: 'center'}}
                >
                    <CheckBox
                        title = {d.day}                        
                    />
                </TouchableOpacity>
            ))
        }    */}

        <Input
            placeholder= 'Frecuencia en minutos de la toma del medicamento.'
            onChange = {(e) => onChange(e, 'period')}
            errorMessage = { errorPeriod }
            defaultValue= {newFormData.period}
        />
        <Input
            placeholder= 'Dosis'
            onChange = {(e) => onChange(e, 'dose')}
            errorMessage = { errorDose }
            keyboardType = 'number-pad'
            defaultValue= {newFormData.dose}
            />
        <Modal isVisible={isVisible} setVisible={setIsVisible}>            
        {<DisplayListMedicines 
            medicine = {medicine} 
            setFormData = {setFormData} 
            formData= {formData}
            setIsVisible = {setIsVisible}
        />}
        </Modal>     
        
        <Button
            title={editMode?'Actualizar inventario':'Agregar a inventario'}
            onPress= {editMode? editInventory :addInventory}
            buttonStyle = {styles.btnAdd}  
        />
        
    </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        flex: 1,
        margin: 10        
    },

    title: {
        color: '#f9b30b'
    },

    listStyle: {        
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',        
    },

    btnAdd: {
        margin: 20,
        backgroundColor: '#f9b30b',
        borderRadius: 20
    }
})

function defaultFormValues () {
    return {
        name: '',        
        days: [],
        dose:'',
        period: '',
        id: ''        
    }
}