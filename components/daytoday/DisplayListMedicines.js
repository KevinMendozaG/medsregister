import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

export default function DisplayListMedicines({medicine, setFormData, formData, setIsVisible}) {

    const itemSelected = (name, id) => {
         setFormData({...formData, name: name, id: id})
         setIsVisible(false)
    }

    return (
        <ScrollView>
            {
                map(medicine, (med, id) =>(
                <ListItem
                    key= {id}
                    onPress = {()=> itemSelected(med.name, med.id)  }                
                >
                    <ListItem.Content>
                        <ListItem.Title>
                            {med.name}             
                        </ListItem.Title>                                          
                    </ListItem.Content>                
                </ListItem>
            
                ))
            
            }
           </ScrollView> 
    )
}

const styles = StyleSheet.create({})
