import React from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import {deleteDocumentById} from '../../utils/actions'

export default function ListInvetory({ inventory, navigation }) {
    return (
        <View>
        <FlatList
             keyExtractor = {(item, index)=> index.toString()}
             data = { inventory }
             renderItem = { (inventory) => (
                 <Inventory inventory = {inventory} navigation = {navigation} />
             ) }
        />
    </View>
    )
}

function Inventory ({ inventory, navigation }) {
    const {name, dose, period, id} = inventory.item
    const editMode = true

    const deleteRegister = async (id) => {
        Alert.alert(
            'Eliminar imagen',
            '¿Estas seguro que quieres eliminar la imagen?',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Sí',
                    onPress: async () => {
                        const deleteResponse = await deleteDocumentById('inventory', id)
                        if (!deleteResponse.statusResponse) {
                            // toastRef.current.show('Error al grabar el medicamento, por favor intente más tarde')
                            console.log(deleteResponse.error)            
                            return
                        }
                        navigation.navigate('inventory')
                    }
                }
            ],
            {cancelable: false}
        )
    }
    return(
        
         <TouchableOpacity onPress = {() => navigation.navigate('addMedicineToInvetory', {id, editMode})}>             
                <Card containerStyle =  {styles.cardStyle}>
                    <Card.Title style={styles.cardTitle}>{name}</Card.Title>
                        <Card.Divider/> 
                        <View style = {{flexDirection: 'row'}}>
                            <View style={{marginRight: 20}}>
                                <Text style={{alignSelf:'center'}}>Frecuencia de toma</Text>
                                <Text style={{fontSize:24, fontWeight: 'bold', alignSelf:'center'}}> {period}</Text>
                               
                          </View>
                        <View style = {{flexDirection: 'row'}}>
                                <Text>Dosis: {dose}</Text>
                                <Icon
                                    type= 'feather'
                                    name= 'delete'                                                                        
                                    size = {50}
                                    containerStyle={styles.icon}
                                    onPress ={()=>deleteRegister(id)}
                                />
                        </View>                      
                       
                        </View>    
                </Card>
            
         </TouchableOpacity>
    )
}


const styles = StyleSheet.create({})
