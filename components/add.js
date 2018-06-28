import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import { ImagePicker, ImageManipulator, Permissions } from 'expo';

export default class Add extends React.Component {
  state = {
    img:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/220px-Tux.svg.png',
    name: '',
    address: '',
    tags: '',
    tel: '',
    url: '',
    info: '',
  };

  _openPhotoGallery = async () => {
    await this.checkPhotoGalleryPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log(result);
      // Resize the image
      const manipResult = await ImageManipulator.manipulate(
        result.uri,
        [{ resize: { width: 375 } }],
        { format: 'png' }
      );
      console.log(manipResult);
      this.setState({ image: manipResult.uri });
    }
  };

  checkPhotoGalleryPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };

  checkCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };

  _pickImageFromCamera = async () => {
    await this.checkPhotoGalleryPermissions();
    await this.checkCameraPermissions();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    const manipResult = await ImageManipulator.manipulate(
      result.uri,
      [{ resize: { width: 375 } }],
      { format: 'png' }
    );

    if (!result.cancelled) {
      this.setState({ image: manipResult.uri });
    }
  };

  _selectPhoto = () => {
    console.log('show action sheet');
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Camera', 'Photo Gallery', 'Cancel'],
          cancelButtonIndex: 2,
          title: 'Choose a picture from',
        },
        btnIndex => {
          if (btnIndex == 0) {
            this._pickImageFromCamera;
          } else if (btnIndex == 1) {
            this._openPhotoGallery;
          }
        }
      );
    } else {
      // You can use an Alert Dialog on Android to do the same
      Alert.alert(
        'Take Image',
        'Scegli il metodo',
        [
          {
            text: 'Camera',
            onPress: this._pickImageFromCamera,
          },
          {
            text: 'Gallery',
            onPress: this._openPhotoGallery,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  _add = () => {
    if (
      !this.state.img ||
      !this.state.address ||
      !this.state.name ||
      !this.state.tags
    ) {
      Alert.alert(
        'Attenzione',
        'Inserisci i campi obbligatori: name, address, image e tags',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      //creo il nuovo oggetto
      let tags = this.state.tags.split(',');
      let nuovo = {
        img: this.state.img,
        name: this.state.name,
        address: this.state.address,
        tags,
        info: this.state.info,
        tel: this.state.tel,
        url: this.state.url,
      };

      console.log(nuovo);
      //rimanda l'oggetto nella home
      this.props.navigation.state.params.onAdd(nuovo);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={this._selectPhoto} style={styles.topImg}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: this.state.img,
            }}
          />
        </TouchableOpacity>
        <View style={[styles.top, { padding: 15 }]}>
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ name: value })}
            placeholder="Name"
          />
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ address: value })}
            placeholder="Address"
          />
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ tags: value })}
            placeholder="Tags use ',' to split"
          />
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ info: value })}
            placeholder="info"
          />
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ tel: value })}
            placeholder="tell"
          />
          <TextInput
            style={{ fontSize: 18, margin: 10 }}
            value={this.state.text}
            onChangeText={value => this.setState({ url: value })}
            placeholder="url"
          />
        </View>
        <Button title="Add" onPress={this._add} />
      </ScrollView>
    );
  }
}

Add.navigationOptions = ({ navigation }) => ({
  title: 'Add',
  headerStyle: {},
});

const styles = StyleSheet.create({
  topImg: {
    alignItems: 'center',
    marginTop: 10,
  },
  top: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
  },
});
