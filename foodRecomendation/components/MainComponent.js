import React, { Component } from 'react';
import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';
import { Constants, Location, Permissions } from 'expo';
import { Platform, Text, View, StyleSheet } from 'react-native';
import styles from './styles';
import RecommendationsMap from './RecommendationsMap';
import { OverlayTopics, BottomTopics } from './Topics';


const CLIENT_ID = '1240MVXTKU0CKWB1MHPUVUFB0OURNQPL5S3TICGBW20JIXND';
const CLIENT_SECRET = 'Y3CFSGHRV23CKPBI34IZIE4ENGSW3CHDMCYCUDYA01NQMBVM';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 20000;

class MainComponent extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
        recommendations: [],
        lookingFor: null,
        headerLocation: null,
        last4sqCall: null
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
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        }
        console.log(region);
        this.onRegionChange(region, location.coords.accuracy);
    };

    onRegionChange(region, gpsAccuracy) {
        console.log('on region change');
        this.fetchVenues(region);
        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }


    //json.response.groups.reduce -> an array of arrays and concatenating them into one big array
    fetchVenues(region, lookingFor) {
        if (!this.shouldFetchVenues(lookingFor)) return;

        const query = this.venuesQuery(region, lookingFor);
        console.log('fecthVenues');
        fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(fetch.throwErrors)
            .then(res => res.json())
            .then(json => {
                //console.log('json ' + JSON.stringify(json));
                if (json.response.groups) {
                    console.log(json);
                    this.setState({
                        recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()
                    });
                }
            })
            .catch(err => console.log(err));
    }

    //API calling every 20 seconds 
    shouldFetchVenues(lookingFor) {
        return lookingFor != this.state.lookingFor
            || this.state.last4sqCall === null
            || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
    }

    //turn an object into a URL query
    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }

    onTopicSelect(lookingFor) {
        this.fetchVenues(this.state.mapRegion, lookingFor);
        this.setState({
            lookingFor: lookingFor
        });
    }

    render() {
        const { mapRegion, lookingFor } = this.state;
        if (mapRegion !== undefined || mapRegion !== null) {
            console.log('mapRegion ' + JSON.stringify(this.state.recommendations));
        }

        if (mapRegion) {
            return (
                <Screen>
                    <RecommendationsMap {...this.state}
                        onRegionChange={this.onRegionChange.bind(this)} />
                    {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)} />
                        : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} />}
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