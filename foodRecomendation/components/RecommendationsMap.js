import React, { Component } from 'react';
import { MapView } from 'expo';
import styles from './styles';
import { Title, Screen } from '@shoutem/ui';
import Recommendation from './Recomendation';


const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
    headerLocation, onRegionChange }) => (
        <Screen>
            <Title styleName="h-center multiline" style={styles.mapHeader}>
                {lookingFor ? `${lookingFor} in` : ''} {headerLocation}
            </Title>

            <MapView initialRegion={mapRegion}
                style={styles.fullscreen}
                onRegionChange={onRegionChange}
                showsUserLocation={true}>

                {recommendations.map(r => <Recommendation {...r} key={r.venue.id} />)}
            </MapView>
        </Screen>
    );
export default RecommendationsMap;