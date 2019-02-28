import React, { Component } from 'react';
import { MapView } from 'expo';
import styles from './styles';
import { Title } from '@shoutem/ui';
import Recommendation from './Recomendation';


const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
    headerLocation, onRegionChange }) => (

        <MapView initialRegion={mapRegion}
            style={styles.fullscreen}
            onRegionChange={onRegionChange}
            showsUserLocation={true}>
            <Recommendation/>
        </MapView>
    );
export default RecommendationsMap;