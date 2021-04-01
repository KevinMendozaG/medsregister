import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'

import RegisterForm from '../../components/account/RegisterForm'

export default function Register() {
    return (
        <KeyboardAwareScrollView
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/medsregister.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <RegisterForm/>
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginTop: 20,
        marginBottom: 10
    },
    viewBody: {
        backgroundColor: "#FFFFFF"
    },
    divider: {
        backgroundColor:"#442484",
        margin: 40
    },
    container:{
        marginHorizontal: 40,
    }
})
