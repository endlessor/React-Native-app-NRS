import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button } from 'native-base';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';

import { replaceRoute, pushNewRoute } from '@actions/route';
import { setDetail } from '@actions/globals';

import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';

import homeData from '../../dummy/homeData.json';
import Global from '@src/Global';
import Rating from '@components/Rating';


class TabHome extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),

      viewRef: 0,
    };
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }
  gotoDetail(item) {
    Global.detailData = item;
    this.props.setDetail(true);
  }
  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }
  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'white'}]}>
        <View style={[styles.headerView, {backgroundColor: Colors.brandPrimary, flexDirection:'row'}]}>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'bars'}/>
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Shop</Text>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'search'}/>
          <Image source={Images.ic_barcode_scan}
            style={{ width: 30, height: 30, marginLeft:20, tintColor:'white'}}
          />              
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20, marginRight:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'shopping-cart'}/>          
        </View>
        <ScrollView>
          <Swiper height={Metrics.screenHeight * 0.5} horizontal={true} style={{backgroundColor: 'yellow'}}>
            <View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store2} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>CHANGE STORE</Text>        
                    </View>
                    <Thumbnail style={{width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.2, borderRadius: Metrics.screenWidth * 0.1}} source={Images.store2} />
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>SET AS A FAVORITE</Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>STARLING</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>727 MANHATTAN AVE, PROOKLYN, NY 11222, USA</Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={4}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>Monday to Friday 4:30AM~8PM</Text>
                  </View>
              </View>
            </View>
            <View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store3} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>CHANGE STORE</Text>        
                    </View>
                    <Thumbnail style={{width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.2, borderRadius: Metrics.screenWidth * 0.1}} source={Images.store3} />
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>SET AS A FAVORITE</Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>STARLING</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>727 MANHATTAN AVE, PROOKLYN, NY 11222, USA</Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={4}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>Monday to Friday 4:30AM~8PM</Text>
                  </View>
              </View>
            </View>
            <View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store2} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>CHANGE STORE</Text>        
                    </View>
                    <Thumbnail style={{width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.2, borderRadius: Metrics.screenWidth * 0.1}} source={Images.store2} />
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>SET AS A FAVORITE</Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>STARLING</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>727 MANHATTAN AVE, PROOKLYN, NY 11222, USA</Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={4}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>Monday to Friday 4:30AM~8PM</Text>
                  </View>
              </View>
            </View><View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store2} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>CHANGE STORE</Text>        
                    </View>
                    <Thumbnail style={{width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.2, borderRadius: Metrics.screenWidth * 0.1}} source={Images.store2} />
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>SET AS A FAVORITE</Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>STARLING</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>727 MANHATTAN AVE, PROOKLYN, NY 11222, USA</Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={4}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>Monday to Friday 4:30AM~8PM</Text>
                  </View>
              </View>
            </View>
            <View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store1} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>CHANGE STORE</Text>        
                    </View>
                    <Thumbnail style={{width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.2, borderRadius: Metrics.screenWidth * 0.1}} source={Images.store1} />
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>SET AS A FAVORITE</Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>STARLING</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>727 MANHATTAN AVE, PROOKLYN, NY 11222, USA</Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={4}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>Monday to Friday 4:30AM~8PM</Text>
                  </View>
              </View>
            </View>
          </Swiper>
        <View style={{flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            style={{margin:5, fontSize: 15}}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'search'}
            size={Metrics.screenHeight / 30}
          />
          <TextInput
            style={{ marginHorizontal: 5, width: Metrics.screenWidth * 0.8}}
            onChangeText={(text) => this.setState({text})}
            placeholder="Search"
          />
          <Image source={Images.ic_barcode_scan}
            style={{ width: 30, height: 30}}
          />
        </View>
        <View style={{ backgroundColor: '#eeeeee'}}>
          <View style={{}}>
            <Text style={{ marginLeft: 10, fontSize: 13}}>Fast Food</Text>
            <ListView
              horizontal={true}
              style={{flex:1}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                  <Image style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3}} source={Images.food1} />
                  <View style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3,  backgroundColor: 'white'}}>
                    <View style={[Styles.center, {flex:1, backgroundColor: 'grey'}]}>
                      <Text style={{ color: 'white'}}>$48.00</Text>
                    </View>
                    <Text style={{ flex: 1, color: 'grey'}}>$52.00</Text>
                    <Text style={{ flex:1}}>Hot Dog</Text>
                    <View style={{flex:1}} />
                    <Text style={{ flex: 1, fontSize: 10}}>In store</Text>
                    <Text style={{ flex: 1, fontSize: 10}}>Save 4.00$ </Text>
                    <View style={{ flex: 1.5, justifyContent:'center', alignItems:'center', borderRadius: 3, backgroundColor: Colors.brandPrimary}}>
                      <Text style={{fontSize: 11,  color: 'white'}}>ADD TO CART</Text>
                    </View>
                  </View>
                </View>}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#eeeeee'}}>
          <View style={{}}>
            <Text style={{ marginLeft: 10, fontSize: 13}}>Fast Food</Text>
            <ListView
              horizontal={true}
              style={{flex:1}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                  <Image style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3}} source={Images.food2} />
                  <View style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3,  backgroundColor: 'white'}}>
                    <View style={[Styles.center, {flex:1, backgroundColor: 'grey'}]}>
                      <Text style={{ color: 'white'}}>$48.00</Text>
                    </View>
                    <Text style={{ flex: 1, color: 'grey'}}>$52.00</Text>
                    <Text style={{ flex:1}}>Hot Dog</Text>
                    <View style={{flex:1}} />
                    <Text style={{ flex: 1, fontSize: 10}}>In store</Text>
                    <Text style={{ flex: 1, fontSize: 10}}>Save 4.00$ </Text>
                    <View style={{ flex: 1.5, justifyContent:'center', alignItems:'center', borderRadius: 3, backgroundColor: Colors.brandPrimary}}>
                      <Text style={{fontSize: 11,  color: 'white'}}>ADD TO CART</Text>
                    </View>
                  </View>
                </View>}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#eeeeee'}}>
          <View style={{}}>
            <Text style={{ marginLeft: 10, fontSize: 13}}>Fast Food</Text>
            <ListView
              horizontal={true}
              style={{flex:1}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                  <Image style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3}} source={Images.food1} />
                  <View style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3,  backgroundColor: 'white'}}>
                    <View style={[Styles.center, {flex:1, backgroundColor: 'grey'}]}>
                      <Text style={{ color: 'white'}}>$48.00</Text>
                    </View>
                    <Text style={{ flex: 1, color: 'grey'}}>$52.00</Text>
                    <Text style={{ flex:1}}>Hot Dog</Text>
                    <View style={{flex:1}} />
                    <Text style={{ flex: 1, fontSize: 10}}>In store</Text>
                    <Text style={{ flex: 1, fontSize: 10}}>Save 4.00$ </Text>
                    <View style={{ flex: 1.5, justifyContent:'center', alignItems:'center', borderRadius: 3, backgroundColor: Colors.brandPrimary}}>
                      <Text style={{fontSize: 11,  color: 'white'}}>ADD TO CART</Text>
                    </View>
                  </View>
                </View>}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#eeeeee'}}>
          <View>
            <Text style={{ marginLeft: 10, fontSize: 13}}>Fast Food</Text>
            <ListView
              horizontal={true}
              style={{flex:1}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                  <Image style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3}} source={Images.food3} />
                  <View style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3,  backgroundColor: 'white'}}>
                    <View style={[Styles.center, {flex:1, backgroundColor: 'grey'}]}>
                      <Text style={{ color: 'white'}}>$48.00</Text>
                    </View>
                    <Text style={{ flex: 1, color: 'grey'}}>$52.00</Text>
                    <Text style={{ flex:1}}>Hot Dog</Text>
                    <View style={{flex:1}} />
                    <Text style={{ flex: 1, fontSize: 10}}>In store</Text>
                    <Text style={{ flex: 1, fontSize: 10}}>Save 4.00$ </Text>
                    <View style={{ flex: 1.5, justifyContent:'center', alignItems:'center', borderRadius: 3, backgroundColor: Colors.brandPrimary}}>
                      <Text style={{fontSize: 11,  color: 'white'}}>ADD TO CART</Text>
                    </View>
                  </View>
                </View>}
            />
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

TabHome.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  setDetail: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setDetail: status => dispatch(setDetail(status)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
