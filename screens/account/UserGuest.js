import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Button } from "react-native-elements"
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Text style={styles.title}>Cuenta MedsRegister</Text>
            <Text style={styles.description}>
                ¿Cansado de que se te pase la hora para tomar tus medicamentos? Únete y empieza a organizar tus horarios
            </Text>
            <Image
                source={require("../../assets/medsregister.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Button
                title="Iniciar Sesion"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("login")}
            />
            <Button
                title="Crear Cuenta"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("register")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal:10,
        backgroundColor: "#FFFFFF"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom:10,
        fontSize: 22
    },
    description: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#053243",
        justifyContent: "center"
    },
    image: {
        height: 250,
        width: "100%",
        marginBottom: 10
    },
    button: {
        backgroundColor: "#16a69f",
        marginTop: 10
    }
})
