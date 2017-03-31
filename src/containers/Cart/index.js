import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button } from 'native-base';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';
import SudokuGrid from 'react-native-smart-sudoku-grid';

import { replaceRoute, pushNewRoute, popRoute } from '@actions/route';
import { setDetail } from '@actions/globals';


import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';

import homeData from '../../dummy/homeData.json';
import Global from '@src/Global';
const dataList = [
    {
        name: 'cash',
        count: 0,
    }, 
    {
        name: 'credit',
        count: 1,
    }, 
    {
        name: 'transfer',
        count: 2,
    },
];

class Cart extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      viewRef: 0,
      cartList: dataList,
    };
    // console.log("constructor");
    // this._onPressPlus = this._onPressPlus.bind(this);
    // this._onPressMinus = this._onPressMinus.bind(this);
    // this._onDeleteCart = this._onDeleteCart.bind(this);
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

  _renderGridCell = (data, index) => (
    
    <View style={{width: Metrics.screenWidth * 0.95, alignSelf: 'center', marginTop: 10, height: Metrics.screenWidth * 0.45, backgroundColor: 'white', borderRadius: 10, flexDirection:'row'}}>
      <View style={{flex: 3}}>
        <Image source={Images.food1} style={{ flex: 1, width: null, height: null, margin: 10,}}/>
      </View>
            
      <View style={{flex: 3, backgroundColor: '#ffffff',  justifyContent: 'space-between'}}>
        <Text numberOfLines={2} style={{ fontSize: Metrics.screenHeight / 30}}>{data.name}</Text>
        <Text>17 oz</Text>
        <View style={[Styles.left, { flexDirection: 'row'}]}>
          <Icon
            style={{fontSize: 15, color: Colors.buttonPrimary, marginRight: 5,}}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'shopping-cart'}/>
          <Text style={{color: Colors.buttonPrimary}}>Delivery</Text>
        </View>
        <Text style={{ fontSize: Metrics.screenHeight / 30}}>$101.00</Text>
      </View>
      <View style={[Styles.center, {flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'grey', borderBottomRightRadius:10, borderTopRightRadius:10}]}>      
        <TouchableOpacity onPress={this._onPressPlus.bind(this, data, index ) }>  
            <Icon
                style={{fontSize: 20, color: 'white', marginRight: 5,}}
                containerStyle={Styles.center}
                color={Colors.textPrimary}
                name={'plus'}/>
        </TouchableOpacity>
        <Text style={{color: 'white'}}>{data.count}</Text>
        <TouchableOpacity>
            {
                data.count > 0 &&
                <Icon
                    onPress={ this._onPressMinus.bind(this, data, index ) }
                    style={{fontSize: 20, color: 'white', marginRight: 5,}}
                    containerStyle={Styles.center}
                    color={Colors.textPrimary}
                    name={'minus'}/>
            }
            {
                data.count == 0 &&
                <Icon
                    onPress={ this._onDeleteCart.bind(this, data, index ) }
                    style={{fontSize: 20, color: 'white', marginRight: 5,}}
                    containerStyle={Styles.center}
                    color={Colors.textPrimary}
                    name={'trash-o'}/>
            }
        </TouchableOpacity>
      </View>
    </View>
    
  )

  _onPressPlus = (data, index) => {
      console.log("adsf");
      var temp = this.state.cartList.concat();
      temp[index].count += 1;
      this.setState({ cartList: temp });
  }

  _onPressMinus = (data, index) => {
      var temp = this.state.cartList.concat();
      temp[index].count -= 1;
      this.setState({ cartList: temp });
  }

  _onDeleteCart = (data, index) => {
      var temp = this.state.cartList.concat();
      temp.splice(index, 1);
      this.setState({ cartList: temp });
  }

  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'lightgrey'}]}> 
        <View style={[styles.headerView, {backgroundColor: Colors.brandPrimary, flexDirection:'row'}]}>
          <TouchableOpacity onPress={() => this.props.popRoute()}>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'arrow-left'}/>
          </TouchableOpacity>
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Cart </Text>
        </View>
        
        <ScrollView>
          <SudokuGrid
            columnCount={1}
            dataSource={this.state.cartList}
            renderCell={this._renderGridCell}
          />
        </ScrollView>

        <View style={[Styles.center, {backgroundColor:'white'}]}>
            <TouchableOpacity style={[Styles.center, { backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.7, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.15, borderRadius: 5}]}>
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>CHECKOUT NOW</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Cart.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  setDetail: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    popRoute: () => dispatch(popRoute()),
    setDetail: status => dispatch(setDetail(status)),
  };
}
function mapStateToProps(state) {
  return { 
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
