import React from 'react';
import { Map, InfoWindow, Marker } from 'google-maps-react';


export class MapContainer extends Component {

    render() {
        const mapStyle = {
            height: '300px',
            width: '900px'
        }
        return (

            <Map google={this.props.google} zoom={14} styles={mapStyle}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />


            </Map>
        );
    }




    export default GoogleApiWrapper({
        apiKey: ("AIzaSyAhG0MxYGxWRvL4aO5VDABYZ_Xohlp9kMg")
  }) (MapContainer)