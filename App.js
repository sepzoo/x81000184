import React, { Component } from 'react';
import { Constants } from 'expo';
import { StackNavigator, createStackNavigator } from 'react-navigation';

import * as firebase from 'firebase';
import Home from './components/home';
import Details from './components/details'
import Add from './components/add'

var config = {
  apiKey: 'AIzaSyBeIvyJOmgG7H8iKu-DL1RnFofPjhv1_Sg',
  authDomain: 'fbexample-b69f4.firebaseapp.com',
  databaseURL: 'https://fbexample-b69f4.firebaseio.com',
  projectId: 'fbexample-b69f4',
  storageBucket: 'fbexample-b69f4.appspot.com',
  messagingSenderId: '54754252097',
};
!firebase.apps.length ? firebase.initializeApp(config) : null;

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    Add: {
      screen: Add
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default App;
