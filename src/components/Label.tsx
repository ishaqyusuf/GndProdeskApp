import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


const Label : React.FC<any> =({
    prefix = null,
    dark =  false,
    children = null,
    label = null,
}) => {

    return (

            <Text className={
               'mx-2'
            } style={dark ? styles.dark : styles.light}>
                {label ?? children}
            </Text>

    );
}
export default Label;
const styles = StyleSheet.create({
    dark: {
        color: 'white',
        fontSize: 14,

    },
    light: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
