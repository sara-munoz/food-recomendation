import React, { Component } from 'react';
import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';
import { Constants, Location, Permissions } from 'expo';
import { Platform, Text, View, StyleSheet } from 'react-native';
import styles from './styles';
import RecommendationsMap from './RecommendationsMap';

class MainComponent extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {

        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {

        }
        let location = await Location.getCurrentPositionAsync({});
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
        console.log(region);
        this.onRegionChange(region, location.coords.accuracy);
    };

    onRegionChange(region, gpsAccuracy) {
        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

    render() {
        const { mapRegion, lookingFor } = this.state;
        console.log(mapRegion);
        if (mapRegion) {
            return (
                <Screen>

                </Screen>
            );
        } else {
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
    }
}
export default MainComponent;