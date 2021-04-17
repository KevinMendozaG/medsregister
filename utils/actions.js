import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

import { fileToBlob } from './helpers'
import { size } from 'lodash'

const db= firebase.firestore(firebaseApp)

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const isUserLogged = () =>{
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) =>{
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const registerUser = async(email, password) =>{
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const loginWithEmailAndPassword = async(email, password) =>{
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no validos."
    }
    return result
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url= await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async(data) =>{
    const result = {statusResponse: true, error: null}
    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getFavorites = async(id) => {
    const result = { statusResponse: true, error: null, favorites: [] }
    try {
        const response = await db
            .collection("favorites")
            .where("idUser", "==", id)
            .get()
        response.forEach((doc) => {
            const favorite = doc.data()
            favorite.id = doc.id
            result.favorites.push(favorite)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const checkIfFavorite = async(id, name) => {
    const result = { statusResponse: true, error: null, favorites: [], isFavorite: false }
    try {
        const response = await db
            .collection("favorites")
            .where("idUser", "==", id)
            .where("pharmacyName", "==", name)
            .get()
            response.forEach((doc) => {
                const favorite = doc.data()
                favorite.id = doc.id
                result.favorites.push(favorite)
            })
            if (size(result.favorites)>0) {
                result.isFavorite= true
            }
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const removeFavorite = async(idUser, idFavorite) => {
    const result = { statusResponse: true, error: null }
    try {
        const response = await db
            .collection("favorites")
            .where("idFavorite","==", idFavorite)
            .where("idUser", "==", idUser)
            .get()
        response.forEach(async(doc) =>{
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}