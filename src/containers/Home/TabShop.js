import { Platform, TextInput, Image,  findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
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

import SudokuGrid from 'react-native-smart-sudoku-grid';


const dataList = ['cash', 'credit', 'transfer', 'ddd','dd', 'cash', 'credit', 'transfer', 'ddd','dd'];

class TabShop extends Component {
  constructor(props) {
    super(props);
  }
  _renderGridCell = data => (
    <View style={{padding: 5}}>
      <Thumbnail style={{width: Metrics.screenWidth * 0.5 - 10, height: Metrics.screenWidth * 0.5, borderRadius: 5, padding :5}} source={Images.store1} >
        <View style={{height:40, backgroundColor:'rgba(40, 40, 40, 0.6)', position:'absolute', bottom:0, right:0, left:0, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white'}}>{data}</Text>
        </View>        
      </Thumbnail>      
    </View>
  )
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
      <View style={[Styles.fullScreen, {backgroundColor:'white', height:Metrics.screenHeight - 50}]}>
        <Content style={{backgroundColor: '#fff', flex: 1}}>
          <SudokuGrid
            columnCount={2}
            dataSource={dataList}
            renderCell={this._renderGridCell}
          />
        </Content>
      </View>
    );
  }
}

TabShop.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TabShop);
