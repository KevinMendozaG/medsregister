import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions({ user, toastRef, setReloadUser}) {
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Cambiar Nombre",
                iconNameLeft: "account-convert",
                iconColorLeft: "#94cfc8",
                iconNameRight: "pencil-outline",
                iconColorRight: "#94cfc8",
                onPress : () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Email",
                iconNameLeft: "email-edit-outline",
                iconColorLeft: "#94cfc8",
                iconNameRight: "pencil-outline",
                iconColorRight: "#94cfc8",
                onPress : () => selectedComponent("email")
            },
            {
                title: "Cambiar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#94cfc8",
                iconNameRight: "pencil-outline",
                iconColorRight: "#94cfc8",
                onPress : () => selectedComponent("password")
            },
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                    email={user.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                    setRenderComponent(
                        <ChangePasswordForm
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                        />
                    )
                    break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions();

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e4546c"
    }
})
