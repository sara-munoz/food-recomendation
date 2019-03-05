import React, { Component } from 'react';
import { MapView } from 'expo';
import { Card, Image, Subtitle, Caption } from '@shoutem/ui';
import { View } from 'react-native';

export default class Recommendation extends Component {
    get photo() {
        const photoArray = this.props.venue.photos.groups[0];
        if (photoArray !== undefined) {
            if (photoArray.length > 0) {
                const photo = photoArray.items[0];
                console.log(photo);
                return `${photo.prefix}300x500${photo.suffix}`;
            }
        }
    }

    render() {
        const { venue, tips, index } = this.props;
        const coords = {
            latitude: venue.location.lat,
            longitude: venue.location.lng
        };
        console.log(this.photo);
        return (
            <MapView.Marker
                coordinate={coords}
                title={"marker"}
                description={"desss"}>

                <MapView.Callout>
                    <Card>
                        <Image styleName="medium-wide"
                            source={{ uri: this.photo }} />
                        <View styleName="content">
                            <Subtitle>{venue.name}</Subtitle>
                            <Caption>{tips ? tips[0].text : ''}</Caption>
                        </View>
                    </Card>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}