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
                return `${photo.prefix}300x500${photo.suffix}`;
            }
        }
    }

    render() {

        const coordinate1 = {
            latitude: 3.3752639,
            longitude: -76.5325021,
        };
        const { venue, tips, index } = this.props;
        /*const coords = {
            latitude: venue.location.lat,
            longitude: venue.location.lng
        };*/

        return (

            <MapView.Marker
                coordinate={coordinate1}
                title={"marker"}
                description={"desss"}>

                <MapView.Callout>
                    <Card>
                        <Image styleName="medium-wide"
                            source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }} />
                        <View styleName="content">
                            <Subtitle>SUBTITULO</Subtitle>
                            <Caption>LoremIpsum caption adadjadhahdkajad</Caption>
                        </View>
                    </Card>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}