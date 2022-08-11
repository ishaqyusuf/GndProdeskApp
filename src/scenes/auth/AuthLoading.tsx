import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native'; 

import { useAuth } from "../../auth-provider";

export default function AuthLoading({navigation}) {
    // const {navigate} = props.navigation;
    const { getAuthState } = useAuth();

    useEffect(() => {
        initialize()
    }, []);

    async function initialize() {
        try {
            const {token} = await getAuthState();

            if (token) {
                  navigation.navigate('App');
                // navigation.navigate('Auth', {} ) 
            } else navigation.navigate('Auth');
        } catch (e) {
            navigation.navigate('Auth');
        }
    } 
    return (
        <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator/>
            <Text>{"Loading User Data"}</Text>
        </View>
    );
};