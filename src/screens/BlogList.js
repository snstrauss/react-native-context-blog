import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { BlogContext } from '../context/BlogProvider';

import { Entypo, Ionicons } from '@expo/vector-icons';
import { CountContext } from '../context/CountProvider';
import { getBlogs, removeBlog } from '../services/blog.service';


export default function BlogList({ navigation: { navigate } }){

    // because the context was created in a generic way,
    // we have generic property names, like 'state',
    // so here we can change their name to something more meaningful
    const { state: blogs, methods: blogMethods } = useContext(BlogContext);

    // when data was received, a call to 'blogMethods.add'
    // with the data as payload will add them to the blogs state
    useEffect(() => {
        getBlogs()
        .then(blogMethods.add);
    }, []);

    // blogMethods.remove is used to delete a post
    function removePost(post){
        removeBlog(post)
        .then(() => {
            blogMethods.remove(post);
        });
    }

    function goToBlog(blog){
        navigate('show', { blog });
    }

    const { state: count, methods: countMethods } = useContext(CountContext);

    return (
        <>
            <View style={{borderWidth: 1, borderColor: 'red'}}>
                <Text>
                    count: {count}
                </Text>
                <Button title="add" onPress={countMethods.add} />
                <Button title="sub" onPress={countMethods.subtract} />
            </View>
            <FlatList
                data={blogs}
                keyExtractor={blog => blog.id.toString()}
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
        </>
    )
}

/**
 * this will add a button on the right side of the header, but ONLY on the list screen.
 * we add navigation options specific to this route.
 */
BlogList.navigationOptions = ({ navigation: { navigate } }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigate('create')}>
                <Ionicons style={S.add} name="md-add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
        )
    }
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
    add: {
        marginRight: 30
    }
})