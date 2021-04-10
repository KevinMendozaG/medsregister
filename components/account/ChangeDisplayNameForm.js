import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toastRef, setReloadUser}) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onsubmit = async() =>{
        if(!validateForm()){
            return
        }
        
        setLoading(true)
        const result = await updateProfile({ displayName: newDisplayName})
        setLoading(false)

        if(!result.statusResponse){
            setError("Error al actualizar nombres y apellidos, intenta mas tarde.")
            return
        }
        setReloadUser(true)
        toastRef.current.show("Se han actualizado nombres y apellidos.", 3000)
        setShowModal(false)
    }

    const validateForm = () =>{
        setError(null)
        if(isEmpty(newDisplayName)){
            setError("Debes ingresar nombres y apellidos.")
            return false
        }
        if(newDisplayName === displayName){
            setError("Debes ingresar nombres y apellidos diferentes a los actuales")
            return false
        }
        return true
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nuevo nombre"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type:"material-community",
                    name:"account-convert",
                    color: "#c1c1c1"
                }}
            />
            <Button
                title="Cambiar Nombres y apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onsubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingVertical:10
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width:"95%",
    },
    btn: {
        borderRadius: 5,
        backgroundColor: "#16a69f",
        borderTopWidth: 1,
        borderTopColor: "#d10809",
        borderBottomWidth: 1,
        borderBottomColor: "#d10809",
        paddingVertical: 10
    }
})
