import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'

const widthScreen = Dimensions.get('window').width
const ancho = widthScreen/2-30

export default function ListMedicines({ medicines }) {
    return (
        <View>
            <FlatList
                 keyExtractor = {(item, index)=> index.toString()}
                 data = { medicines }
                 renderItem = { (medicine) => (
                     <Medicine medicine = {medicine} />
                 ) }
                //   numColumns = {2}
                //   horizontal= {false}
            />
        </View>
    )
}

function Medicine ({ medicine }) {
    const {name, quantity, alarm, manufacturer, period} = medicine.item

    return(
         <TouchableOpacity>             
                <Card containerStyle =  {styles.cardStyle}>
                    <Card.Title style={styles.cardTitle}>{name}</Card.Title>
                        <Card.Divider/>                
                                <Text>Fabricante: {manufacturer}</Text>
                                <Text>Alarma nocturna {alarm ? 'Activada' : 'Desactivada' }</Text>
                                <Text>Hora de toma: {period}</Text>
                                
                            
                            <Text style={{alignSelf:'center'}}>Cantidad</Text>
                            <Text style={{fontSize:24, fontWeight: 'bold', alignSelf:'center'}}> {quantity}</Text>
                            
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
    }
})
