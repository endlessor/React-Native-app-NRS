import { Text, TextInput, Image, View, TouchableOpacity,TouchableHighlight,  Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import { InputGroup, Input, Button, Icon} from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';


import { replaceRoute, popRoute } from '@actions/route';

import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';
import { firebaseApp } from '@src/firebase';

import ministriesData from '../../dummy/ministriesData.json';

class TabTaxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:[],
    };
  }
  componentWillMount() {
    var categories = [];
    for(var i = 0; i < ministriesData.ministries.length; i++){
      categories.push(ministriesData.ministries[i].name);
    }
    this.setState({ categories: categories })    
  }
  _category_list_renderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.category_list_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white', flexDirection: 'row', alignItems: 'center'}]}>
          <Icon name="ios-done-all-outline" style={{color: Colors.brandPrimary, width: 30, marginLeft: 5,}} />
          <Text numberOfLines={1} style={[styles.category_list_row_text, highlighted && {color: '#007d55'}]}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const spacer = (<View style={{ height: Metrics.screenHeight / 40 }} />);
    return (
      <KeyboardAwareScrollView automaticallyAdjustContentInsets={false}>
        <View style={[Styles.center, {flex:1,  alignItems:'center', backgroundColor:'transparent'}]}>
            <Image
                resizeMode={'stretch'}
                style={{ width: Metrics.screenWidth - 40, height: (Metrics.screenWidth -40) / 3.7, marginTop: 10, marginBottom: 20 }}            
                source={Images.visaCreditCard}>
            </Image>          

            <View style={{ flex:1, width: Metrics.screenWidth * 0.8, alignItems:'center'}}>
                <Text>
                    {I18n.t('SELECTTAXTOPAY')}
                </Text>
                <View style={{borderColor: Colors.brandPrimary, 
                                width: Metrics.screenWidth * 0.8, 
                                marginTop:5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1, 
                                borderRadius: 8 }}>
                    <ModalDropdown
                    ref={el => this._category_list = el}
                    style={styles.category_list}
                    textStyle={styles.category_list_text}
                    dropdownStyle={styles.category_list_dropdown}
                    renderRow={this._category_list_renderRow.bind(this)}
                    options={this.state.categories}/>
                    <Icon name="ios-arrow-dropdown-circle-outline" style={{color: Colors.brandPrimary, width: 30}} />
                </View>
                                
            </View>

            <View style={{ flex:1, width: Metrics.screenWidth * 0.8, alignItems:'center'}}>
                <Text>
                    {I18n.t('NAMEONCARD')}
                </Text>
                <View style={[styles.taxTextBoxStyle, ]}>
                    <TextInput
                    style={{ height: 35}}
                    placeholder=""
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={email => this.setState({ email })}
                    />                        
                </View>
            </View>

            <View style={{ flex:1, width: Metrics.screenWidth * 0.8, alignItems:'center'}}>
                <Text>
                    {I18n.t('CARDNUMBER')}
                </Text>
                <View style={[styles.taxTextBoxStyle]}>
                    <TextInput
                    style={{ height: 35}}
                    placeholder=""
                    keyboardType={'numeric'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={email => this.setState({ email })}
                    />
                </View>
            </View>

            <View style={{ flex:1, width: Metrics.screenWidth * 0.8, alignItems:'center'}}>
                <Text>
                    {I18n.t('CARDEXPIRYDATE')}
                </Text>
                <View style={[styles.taxTextBoxStyle]}>
                    <TextInput
                    style={{ height: 35, textAlign:'center'}}
                    keyboardType={'numeric'}
                    placeholder="MM/YY"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={email => this.setState({ email })}
                    />
                </View>
            </View>

            <View style={{ flex:1, width: Metrics.screenWidth * 0.8, alignItems:'center'}}>
                <Text>
                    {I18n.t('SECCODE')}
                </Text>
                <View style={[styles.taxTextBoxStyle]}>
                    <TextInput
                    style={{ height: 35, textAlign:'center'}}
                    placeholder="MM/YY"
                    keyboardType={'numeric'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={email => this.setState({ email })}
                    />
                </View>
            </View>

                <View style={[{flex:1,  width: Metrics.screenWidth * 0.9, marginTop: 20}, Styles.center]}>
                <TouchableOpacity style={[Styles.center, styles.buttonStyle]} onPress={() => alert('Submit')}>
                    <Text style={styles.buttonTextStyle}>
                        {I18n.t('SUBMIT')}
                    </Text>
                </TouchableOpacity>
            </View> 

        </View>            
      </KeyboardAwareScrollView>
    );
  }
}

TabTaxes.propTypes = {
    dispatch: React.PropTypes.func.isRequired, 
};

function mapDispatchToProps(dispatch) {
  return {
      dispatch,      
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabTaxes);
