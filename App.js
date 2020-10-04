import React from 'react';
import { StyleSheet, View } from 'react-native';
import BlogProvider from './src/context/BlogProvider';
import CountProvider from './src/context/CountProvider';

import CreateBlog from "./src/screens/CreateBlog";
import EditBlog from "./src/screens/EditBlog";
import ShowBlog from "./src/screens/ShowBlog";

const { createAppContainer } = require("react-navigation");
const { createStackNavigator } = require("react-navigation-stack");
const { default: BlogList } = require("./src/screens/BlogList");

const navigator = createStackNavigator({
  list: BlogList,
  show: ShowBlog,
  create: CreateBlog,
  edit: EditBlog
}, {
  initialRouteName: 'list',
  defaultNavigationOptions: {
    title: 'context blog'
  }
});

const Routes = createAppContainer(navigator);

/**
 * BlogProvider is used at top of app, to provide all components with it's state and methods.
 */
export default function App(){
  return (
    <BlogProvider>
      <CountProvider>
        <View style={S.appContainer}>
          <Routes />
        </View>
      </CountProvider>
    </BlogProvider>
  )
}

const S = StyleSheet.create({
  appContainer: {
    flex: 1
  }
})