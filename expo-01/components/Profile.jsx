import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CardComFoto({ imagem, titulo, descricao, onPress }) {
    return (
        <View>
            <Image
                source={'../public/Gemini_Generated_Image_gsch64gsch64gsch.webp'}
                style={styles.imagem}
                resizeMode="cover"
            />

            <Text style={styles.titulo}>oi</Text>
        </View>


    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 340,
        elevation: 4, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    imagem: {
        width: '100%',
        height: 180,
    },
    conteudo: {
        padding: 16,
        gap: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    descricao: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
});
