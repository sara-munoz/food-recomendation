import React, { Component } from 'react';
import { MapView } from 'expo';
import styles from './styles';
import { Title } from '@shoutem/ui';

const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
    headerLocation, onRegionChange }) => (

        <MapView initialRegion={mapRegion}
            style={styles.fullscreen}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
        >

            <Title styleName="h-center multiline" style={styles.mapHeader}>
                {lookingFor ? `${lookingFor} in` : ''} {headerLocation}
            </Title>

        </MapView>
    );
export default RecommendationsMap;