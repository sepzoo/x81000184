import React from 'react';
import { FlatList, View, Text, Button, AsyncStorage } from 'react-native';

import Luogo from './luogo';

export default class Home extends React.Component {
  state = {
    luoghi: [],
  };

  componentWillMount = async () => {
    //provo a caricare da AsyncStorage
    await this._retrieveData();
    //carico i dati dal json
    console.log('luoghi:', this.state.luoghi)
    if(this.state.luoghi.length == 0){
      console.log('qui')
    let tmpLog = [];
    await fetch('https://www.dmi.unict.it/~calanducci/LAP2/favorities.json')
      .then(response => response.json())
      .then(responseJson => {
        tmpLog = responseJson.data;
      });
    this.setState({
      luoghi: tmpLog,
    });
    }
  };

  _add = async (item) => {
    let luog = [...this.state.luoghi, item]
    this.setState({
      luoghi: [luog],
    });
    
    await this._storeData(luog);
  };

  _storeData = async (luog) => {
    console.log('store data called');
    try {
      console.log('saving list');
      await AsyncStorage.setItem('list', JSON.stringify(luog));
    } catch (error) {
      console.log('error saving data', error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('list');
      if (value !== null) {
        this.setState({
          luoghi: JSON.parse(value),
        });
      } else {
        console.log('no data');
      }
    } catch (error) {
      console.log('errore get data');
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onAdd: this._add,
    });
  }

  _renderItem = ({ item }) => {
    return <Luogo data={item} onDetails={() => this._details(item)} />;
  };

  _details = item => {
    //naviga nella details screen
    console.log('details', item);
    this.props.navigation.navigate('Details', {
      currentItem: item,
    });
  };

  _keyExtractor(item, index) {
    String(index);
  }

  render() {
    return (
      <FlatList
        data={this.state.luoghi}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}>
        <Text> sefsfsef </Text>
      </FlatList>
    );
  }
}

Home.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerStyle: {},
  headerRight: (
    <Button
      title="Add"
      onPress={() => {
        navigation.navigate('Add', {
          onAdd: navigation.state.params.onAdd,
        });
      }}
    />
  ),
});
