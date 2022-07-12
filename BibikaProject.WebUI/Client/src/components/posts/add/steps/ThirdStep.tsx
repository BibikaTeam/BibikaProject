import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { isLatLngBoundsLiteral } from "@googlemaps/typescript-guards";
import { Button, Input, InputRef } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { GOOGLE_API_KEY } from "../../../../constants";
import Map from "./map";
import Marker from "./map/marker";

interface ThirdStepProps {
    onFinish: (values: any) => void;
    onBack: () => void;
}

const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

const formatAddress = (place: any) => {
    let address: string = "";

    place.address_components.forEach((component: any) => {
        if (component.types.includes("locality")) {
            address = address + component.long_name + ", ";
        }
        if (component.types.includes("country")) {
            address = address + component.long_name;
        }
    });

    return address;
}

const ThirdStep: FC<ThirdStepProps> = (props) => {
    const [address, setAddress] = useState<string>();
    const [marker, setMarker] = useState<google.maps.LatLng>();
    const [zoom, setZoom] = useState(3); 
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setMarker(e.latLng!);
    reverseGeocode(e.latLng!);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!); 
    setCenter(m.getCenter()!.toJSON());
  };

    const render = (status: Status) => {
        return <>{status}</>
    };
      
    let bounds: google.maps.MapRestriction = {
        latLngBounds: {
            north: 85, 
            south: -85, 
            west: -180, 
            east: 180
        }
    }

    const reverseGeocode = (coords: google.maps.LatLng) => {
        const url = `${geocodeJson}?key=${GOOGLE_API_KEY}&latlng=${coords.lat()},${coords.lng()}`;
        fetch(url)
            .then(response => response.json())
            .then(location => {
              const place = location.results[0];
             
              let address: string = formatAddress(place);
              
                if(address) {
                    setAddress(address);
                } else {
                    setAddress("Try to set marker closer to your city...");
                }

            })
      }

    return(     
        <div className="steps-container">
            
            <div className="steps-body">
                <div className="steps-header">
                    <div className="steps-title-container">
                        <div className="steps-title">
                            3. Your contacts
                        </div>
                        <div className="steps-description">
                            &emsp;
                            Enter the seller's contacts
                        </div>
                    </div>         

                    <div className="steps-actions">
                        <Button className="steps-action-button-back" onClick={() => { props.onBack() }}>
                            Back
                        </Button>
                        <Button className="steps-action-button-done" onClick={() => { props.onFinish(address) }}>
                            Done
                        </Button>
                    </div>
                </div>
                <div className="steps-selects-container">
                    <div className="steps-input-container">
                        Сontact person
                        <Input className="steps-input"/>
                    </div>
                    <div className="steps-input-container">
                            Phone number
                        <Input className="steps-input"/>
                    </div>
                </div>

                <div className="steps-map-container">  
                    Location
                    <div className="steps-map-input">
                        {address}
                    </div>
                    <div className="steps-wrapper">    
                        <Wrapper apiKey={GOOGLE_API_KEY} render={render} libraries={["places"]}>
                            <Map                 
                                onClick={onClick} 
                                onIdle={onIdle} 
                                center={center} 
                                zoom={zoom} 
                                maxZoom={10}
                                minZoom={2}
                                restriction={bounds}
                                streetViewControl={false}
                                mapTypeControl={false}
                                style={{ flexGrow: "1", height: "100%"  }}
                                fullscreenControl={false}>                       
                                <Marker position={marker} />
                            </Map>
                        </Wrapper>
                    </div>
                </div>             
            </div>

            <div className="steps-footer">
                <div className="steps-footer-block">
                    <svg width="28" height="28" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4" stroke="#219CE1" stroke-opacity="0.6" stroke-width="5" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className="steps-footer-block">
                    <svg width="28" height="28" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4" stroke="#219CE1" stroke-opacity="0.6" stroke-width="5" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className="steps-footer-block-active">
                    3. Specify contacts
                </div>
            </div>
        </div>
    )
}

export default ThirdStep;