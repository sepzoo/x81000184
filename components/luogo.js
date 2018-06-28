import React from 'react'
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

export default class Luogo extends React.Component{
  render(){
    return(
      <TouchableOpacity onPress={this.props.onDetails}>
        <Image style={{ width: 400, height: 400 }} source={{uri: this.props.data.img}}/>
        <Text> {this.props.data.name} </Text>
        <Text> {this.props.data.address} </Text>
        {this.props.data.tags.map((msg, index) => (
            <View
              key={String(index)}>
             <Text>  #{msg} </Text>
            </View>
          ))}
      </TouchableOpacity>
    )
  }
}

Luogo.navigationOptions = ({ navigation }) => ({
  title: 'Details',
  headerStyle: {
  },
});