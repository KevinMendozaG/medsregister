import React from 'react'
import { StyleSheet, Text, View  } from 'react-native'
import { Icon } from 'react-native-elements'


export default function Daytoday({ navigation }) {

    return (
        
        <View style={styles.viewBody}>
            <Text>Daytoday...</Text>
            <Icon
                type= 'feather'
                name= 'plus'
                color= '#f9b30b'
                reverse
                containerStyle={styles.btnContainer}
                onPress = {() => navigation.navigate('addMedicine')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',         
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    },

    viewBody:{
        flex: 1
    }
})
