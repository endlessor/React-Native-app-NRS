import { Platform, Image, View, Text, Thumbnail } from 'react-native';
import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Metrics, Styles, Images, Colors } from '@theme/';
import Rating from './Rating';

const { BlurView, VibrancyView } = require('react-native-blur');


export default class    extends Component {
    static propTypes = {
        "shop" : React.PropTypes.object.isRequired,
    }
    render() {
        const shop = this.props.shop
        const actions = {
            changeStoreAction : {
                title: "CHANGE STORE",
                action: function () { }
            },
            setAsFavorite : {
                title: "SET AS A FAVORITE",
                action: function () { }
            }
        }
        const metrics = Metrics;
        const center = Styles.center;
        const colors = Colors;
        const starSize = metrics.starSize;
        const storeImage = Images.store2;
        // TODO: please change this becuase somehow image doens't show!
        const  showThumb = false;

        return (
            <View style={{ width: metrics.screenWidth, height: metrics.screenHeight * 0.5 }}>
                <View style={{ flex: 0.5, backgroundColor: 'transparent' }}></View>
                <View style={[center, { flex: 1.3, flexDirection: 'row', backgroundColor: 'transparent' }]}>
                    <View style={center}>
                        <Icon
                            style={{ fontSize: 20, color: colors.textSecondary }}
                            containerStyle={center}
                            color={colors.textPrimary}
                            name={'location-arrow'}
                        />
                        <Text style={{ margin: 5, fontSize: 9, color: colors.textSecondary }}>{actions.changeStoreAction.title}
                        </Text>
                    </View>
                    {showThumb && <Thumbnail style={{ width: metrics.screenWidth * 0.15, height: metrics.screenWidth * 0.15, borderRadius: metrics.screenWidth * 0.075 }} source={storeImage} />}
                    <View style={center}>
                        <Icon
                            style={{ fontSize: 20, color: colors.textSecondary }}
                            containerStyle={center}
                            color={colors.textPrimary}
                            name={'heart-o'}
                        />
                        <Text style={{ margin: 5, fontSize: 9, color: colors.textSecondary }}>{actions.setAsFavorite.title}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: colors.textSecondary }}>{shop.name}</Text>
                    <Text style={{ fontSize: 10, color: colors.textSecondary }}>{shop.address}</Text>
                    <Rating
                        style={{ marginTop: 30 }}
                        rating={shop.rating}
                        max={5}
                        iconWidth={starSize / 4}
                        iconHeight={starSize / 4}
                        editable={false} />
                </View>
                <View style={[center, { flex: 1, backgroundColor: 'transparent' }]}>
                    <Text style={{ fontSize: 10, color: colors.textSecondary }}>{shop.openingTimes}</Text>
                </View>
            </View>
        )
    }
}

