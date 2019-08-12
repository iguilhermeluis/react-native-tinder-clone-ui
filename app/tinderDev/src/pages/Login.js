import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }){
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Main', { user })
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main', { user: _id });
        console.warn(_id);
    }

    return (
        <View style={ styles.container }>
            <Image source={logo} />

            <TextInput 
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Digite seu usuário do Github" 
            placeholderTextColor="#999"
            style={styles.input}
            value={user}
            onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                 <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ddd',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }

});