import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ShowBlog({ navigation: { getParam } }){

    const { title, content } = getParam('blog');

    return (
        <View>
            <Text style={S.title}>
                {title}
            </Text>
            <Text style={S.content}>
                {content}
            </Text>
        </View>
    )
}

const S = StyleSheet.create({
    title: {
        fontSize: 20
    },
    content: {
        color: 'green'
    }
})