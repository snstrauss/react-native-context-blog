import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlogContext } from '../context/BlogProvider';

import { Entypo } from '@expo/vector-icons';


export default function BlogList({ navigation: { navigate } }){

    // because the context was created in a generic way,
    // we have generic property names, like 'state',
    // so here we can change their name to something more meaningful
    const { state: blogs, methods: blogMethods } = useContext(BlogContext);

    // when data was received, a call to 'blogMethods.add'
    // with the data as payload will add them to the blogs state
    useEffect(() => {
        fetch('https://jsonstorage.net/api/items/389cd165-7183-47a1-a60a-b2a81f256ed7')
        .then(res => res.json())
        .then(blogMethods.add);
    }, []);

    // blogMethods.remove is used to delete a post
    function removePost(post){
        blogMethods.remove(post);
    }

    function goToAddPost(){
        navigate('create');
    }

    function goToBlog(blog){
        navigate('show', { blog });
    }

    return (
        <>
            <FlatList
                data={blogs}
                keyExtractor={blog => blog.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => goToBlog(item)}>
                        <View style={S.item}>
                            <Text>
                                {item.title}
                            </Text>
                            <TouchableOpacity onPress={() => removePost(item)}>
                                <Entypo style={S.trash} name="trash"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={S.separator}/>
                )}
            />
            <TouchableOpacity style={S.touch} onPress={goToAddPost}>
                <Text style={S.add}>+</Text>
            </TouchableOpacity>
        </>
    )
}

const S = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,



    },
    separator: {
        borderWidth: 1,
        borderColor: 'grey',
        marginHorizontal: 30
    },
    trash: {
        color: 'red',
        fontSize: 20
    },
    touch: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    add: {
        backgroundColor: 'dodgerblue',
        color: 'white',
        fontSize: 30,
        borderRadius: 50,
        width: 50,
        height: 50,
        textAlign: "center",
        textAlignVertical: 'center'
    }
})