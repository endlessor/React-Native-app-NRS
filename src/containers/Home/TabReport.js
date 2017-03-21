import { Text, TextInput, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import { InputGroup, Input, Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

import { replaceRoute, popRoute } from '@actions/route';

import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';
import { firebaseApp } from '@src/firebase';

class TabReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: [],
      videoSource: [],
      crimePosition: '',
    };
  }
  addPhotoUri(uri) {
    var arrayPhoto = this.state.avatarSource;
    arrayPhoto.push(uri);
    this.setState({avatarSource: arrayPhoto});
  }
  addVideoUri(uri) {
    var arrayVideo = this.state.videoSource;
    arrayVideo.push(uri);
    this.setState({videoSource: arrayVideo});
  }
  addCrimePosition() {
    this.setState({crimePosition: 'current position'})
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.addPhotoUri(source);
      }
    });
  }
  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // this.setState({
        //   videoSource: response.uri
        // });
        console.log(response);
        this.addVideoUri(response.uri);
      }
    });
  }
  replaceRoute(route) {
    this.props.replaceRoute(route);
  }
  popRoute(route) {
    this.props.popRoute();
  }

  render() {
    const imageArray = this.state.avatarSource.map( (item, i) => 
      <Image key={i} style={{marginTop: 5, width: Metrics.screenWidth * 0.85, height: Metrics.screenWidth * 0.55}} resizeMode={'cover'} source={item} />);
    const videoArray = this.state.videoSource.map( (item, i) => 
      <TouchableOpacity key={i}
          style={{marginTop: 5, width: Metrics.screenWidth * 0.85, height: Metrics.screenWidth * 0.55}}
          
        >
          <Video source={{uri: item, mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version.
            rate={1.0}                   // 0 is paused, 1 is normal.
            volume={1.0}                 // 0 is muted, 1 is normal.
            muted={false}                // Mutes the audio entirely.
            paused={false}               // Pauses playback entirely.
            resizeMode="cover"           // Fill the whole screen at aspect ratio.
            repeat={true}                // Repeat forever.
            onLoadStart={this.loadStart} // Callback when video starts to load
            onLoad={this.setDuration}    // Callback when video loads
            onProgress={this.setTime}    // Callback every ~250ms with currentTime
            onEnd={this.onEnd}           // Callback when playback finishes
            onError={this.videoError}    // Callback when video cannot be loaded
            style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0}} />
        </TouchableOpacity>
  
    );  
    return (
      <View style={[Styles.fullScreen, {backgroundColor: 'white'}]}>         
        <ScrollView style={{ backgroundColor : 'transparent'}}>
          <View style={[Styles.center, { flex: 2 }]}>
            <View style={styles.reportLogoContainer}>
              <Image
                resizeMode={'stretch'}
                style={[styles.imgCrime, {tintColor: 'green'}]}
                source={Images.reportTabIcon}
              />
              <Text >
                {I18n.t('REPORT_DESCRIPTION')}
              </Text>
              <Text>
                {I18n.t('REPORT_DESCRIPTION1')}
              </Text>
            </View>
          </View>
          <View style={{ flex: 5, marginBottom: 50, alignItems: 'center' }}>
            <View style={{ width: Metrics.screenWidth * 0.9 }}>
              <Text style={{color: Colors.textPrimary, fontSize: 12}}>
                {I18n.t('DESCRIPTION_OF_CRIME')}
              </Text>
              <View style={{ borderColor: Colors.brandPrimary, borderWidth: 1, borderRadius: 8 }}>
                <TextInput
                  style={{ height: Metrics.screenHeight / 8}}
                  placeholder=""
                  onChangeText={email => this.setState({ email })}
                />
              </View>
            </View>
            {imageArray}
            <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
              <View style={{ width: Metrics.screenWidth * 0.9, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Image source={Images.plusItem} style={{width:30, height:30, margin: 5, marginRight:15}}></Image>
                <Text style={{color: Colors.textPrimary, fontSize: 12}}>
                  {I18n.t('ADD_PHOTO')}
                </Text>
              </View>
            </TouchableOpacity>
            {videoArray}
            <TouchableOpacity onPress={() => this.selectVideoTapped()}>
              <View style={{ width: Metrics.screenWidth * 0.9, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Image source={Images.plusItem} style={{width:30, height:30, margin: 5, marginRight:15}}></Image>
                <Text style={{color: Colors.textPrimary, fontSize: 12}}>
                  {I18n.t('ADD_VIDEO')}
                </Text>
              </View>
            </TouchableOpacity>
            { this.state.crimePosition === '' ? null :<View style={{marginTop: 5, width: Metrics.screenWidth * 0.85, height: Metrics.screenWidth * 0.55}}>
              <MapView
                style={styles.map}
                region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              >
              </MapView>
            </View>}
            <TouchableOpacity onPress={() => this.addCrimePosition()}>
              <View style={{ width: Metrics.screenWidth * 0.9, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Image source={Images.plusItem} style={{width:30, height:30, margin: 5, marginRight:15}}></Image>
                <Text style={{color: Colors.textPrimary, fontSize: 12}}>
                  {I18n.t('EXACT_LOCATION')}
                </Text>
              </View>
            </TouchableOpacity>
            
            <View style={{ height: 60}}></View> 
          </View>
        </ScrollView>
      </View>
    );
  }
}

TabReport.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    popRoute: () => dispatch(popRoute()),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabReport);
