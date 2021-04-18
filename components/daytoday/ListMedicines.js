import React from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import {deleteDocumentById} from '../../utils/actions'

export default function ListMedicines({ medicines, navigation, setReloadFavorite }) {
    return (
        <View>
            <FlatList
                 keyExtractor = {(item, index)=> index.toString()}
                 data = { medicines }
                 renderItem = { (medicine) => (
                     <Medicine medicine = {medicine} navigation = {navigation} setReloadFavorite={setReloadFavorite} />
                 ) }
            />
        </View>
    )
}

function Medicine ({ medicine, navigation, setReloadFavorite }) {
    const {name, quantity, manufacturer, id} = medicine.item
    const editMode = true

    const deleteRegister = async (id, setReloadFavorite) => {
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
                        const deleteResponse = await deleteDocumentById('medicine', id)
                        if (!deleteResponse.statusResponse) {
                            // toastRef.current.show('Error al grabar el medicamento, por favor intente más tarde')
                            console.log(deleteResponse.error)            
                            return
                        }
                        setReloadFavorite(true)
                    }
                }
            ],
            {cancelable: false}
        )
        
    }
    return(
        
         <TouchableOpacity onPress = {() => navigation.navigate('addMedicine', {id, editMode})}>             
                <Card containerStyle =  {styles.cardStyle}>
                    <Card.Title style={styles.cardTitle}>{name}</Card.Title>
                        <Card.Divider/> 
                        <View style = {{flexDirection: 'row'}}>
                            <View style={{marginRight: 20}}>
                                <Text style={{alignSelf:'center'}}>Cantidad</Text>
                                <Text style={{fontSize:24, fontWeight: 'bold', alignSelf:'center'}}> {quantity}</Text>
                               
                          </View>
                        <View style = {{flexDirection: 'row'}}>
                                <Text>Fabricante: {manufacturer}</Text>
                                <Icon
                                    type= 'feather'
                                    name= 'delete'                                                                        
                                    size = {50}
                                    containerStyle={styles.icon}
                                    onPress ={()=>deleteRegister(id, setReloadFavorite)}
                                />
                        </View>                      
                       
                        </View>    
                </Card>
            
         </TouchableOpacity>
    )
}



const styles = StyleSheet.create({

    cardStyle: {
        borderRadius: 10,
        borderColor: '#f9b30b',
        marginBottom: 40        
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        marginLeft: 50
    }
})
