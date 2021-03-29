import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Divider } from 'react-native-elements'

import LoginForm from '../../components/account/LoginForm'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/medsregister.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <LoginForm/>
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    divider: {
        backgroundColor:"#442484",
        margin: 40
    },
    container:{
        marginHorizontal: 40,
    }
})
