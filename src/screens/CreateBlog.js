import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { BlogContext } from '../context/BlogProvider';

export default function CreateBlog({ navigation: { navigate } }){

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const { state: blogs, methods: blogMethods } = useContext(BlogContext);

    function createBlog(){
        blogMethods.add({
            title,
            content
        });
        navigate('list');
    }

    return (
        <>
            <TextInput style={S.title} placeholder="title" value={title} onChangeText={setTitle} autoCorrect={false}/>
            <TextInput style={S.content} placeholder="content" value={content} onChangeText={setContent} autoCorrect={false} multiline />
            <TouchableOpacity onPress={createBlog}>
                <Text style={S.add}>
                    ADD
                </Text>
            </TouchableOpacity>
        </>
    )
}

const S = StyleSheet.create({
    title: {
        fontSize: 40,
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
    content: {
        padding: 10,
        flex: 1,
        textAlignVertical: 'top'
    },
    add: {
        backgroundColor: 'deepskyblue',
        padding: 15,
        textAlign: 'center',
        fontSize: 20,
        margin: 30
    }
});