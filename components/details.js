import React from 'react';
import { Image, View, ScrollView, Text } from 'react-native';

import { MapView, Permissions, Location } from 'expo';

export default class Details extends React.Component {
  state = {
    item: {},
    address: '',
    location: '',
  };

  componentWillMount = async () => {
    const item = this.props.navigation.state.params
      ? this.props.navigation.state.params.currentItem
      : null;

    this.setState({
      item,
    });

    await this._locateItem();
  };

  _locateItem = async () => {
    console.log('entro qui');
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('You need to enable the GPS and authorize it');
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    let address = await Location.geocodeAsync(this.state.item.address);
    //let address = await Location.reverseGeocodeAsync(this.state.item.address);
    this.setState({
      address: address[0].city + ', ' + address[0].name,
      location: location.coords,
    });
  };

  render() {
    return (
      <ScrollView>
        <Image
          style={{ width: 400, height: 400 }}
          source={{ uri: this.state.item.img }}
        />
        <Text> {this.state.item.name} </Text>
        <Text> {this.state.item.address} </Text>
        {this.state.item.tags.map((msg, index) => (
          <View key={String(index)}>
            <Text> #{msg} </Text>
          </View>
        ))}
        <Text> {this.state.item.info} </Text>
        <Text> {this.state.item.tel} </Text>
        <Text> {this.state.item.url} </Text>
        <View>
          <Text> Mappa qui address {this.state.address}  </Text>
        </View>
      </ScrollView>
    );
  }
}
Details.navigationOptions = ({ navigation }) => ({
  title: 'Details',
  headerStyle: {},
});
