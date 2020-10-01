import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BlogContext } from '../context/BlogProvider';



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

    function addPost(){
        navigate('create');
    }

    return (
        <>
            <FlatList
                data={blogs}
                keyExtractor={blog => blog.id.toString()}
                renderItem={({ item }) => (
                    <Text style={S.item}>
                        {item.title}
                    </Text>
                )}
            />
            <TouchableOpacity style={S.touch} onPress={addPost}>
                <Text style={S.add}>+</Text>
            </TouchableOpacity>
        </>
    )
}

const S = StyleSheet.create({
    item: {
        borderWidth: 2,
        borderColor: 'blue'
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