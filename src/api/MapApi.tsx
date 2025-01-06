import {
    CommonRequestPayload,
    DirectionResponsePayload,
    DistanceAndDurationResponsePayload,
    GEOCodePayload,
    GEOCodeResult,
    GoogleAddressAutoCompletePayload,
    Rows,
} from '../model/model';
import Polyline from '@mapbox/polyline';
import { myApiKey } from '../utilitis/utilities'

export function getAddressFromCoordinates({
    latitude,
    longitude,
}: {
    latitude: number;
    longitude: number;
}) {
    return new Promise<string>((resolve, reject) => {

        console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${myApiKey}`);


        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${myApiKey}`,
        )
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 'OK') {
                    resolve(responseJson?.results?.[0]?.formatted_address);
                } else {
                    reject('not found');
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

export function getAddressAutoComplete(placeInput: string) {
    return new Promise<GoogleAddressAutoCompletePayload>((resolve, reject) => {
        fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?&components=country:LK&key=${myApiKey}&input=${placeInput}`,
        )
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 'OK') {
                    resolve(responseJson);
                } else {
                    reject('not found');
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

export function getGeoCode(placeId: string) {
    return new Promise<GEOCodeResult>((resolve, reject) => {
        console.log(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${myApiKey}`);

        fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${myApiKey}`,
        )
            .then(response => response.json())
            .then((responseJson: GEOCodePayload) => {
                if (responseJson.status === 'OK') {
                    resolve(responseJson.result);
                } else {
                    reject('not found');
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

export function getDistanceAndDuration(requestPayload: CommonRequestPayload) {
    return new Promise<Rows[]>((resolve, reject) => {
        const { origins, destination } = requestPayload;
        fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.lat},${destination.lng}&origins=${origins.lat},${origins.lng}&units=metric&key=${myApiKey}`, //units=imperia for miles || units=metric for km
        )
            .then(response => response.json())
            .then((responseJson: DistanceAndDurationResponsePayload) => {
                if (responseJson.status === 'OK') {
                    resolve(responseJson.rows);
                } else {
                    reject('not found');
                }
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

export function getDirections(requestPayload: CommonRequestPayload) {
    return new Promise<{ latitude: number; longitude: number }[]>(
        (resolve, reject) => {
            const { origins, destination } = requestPayload;
            fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origins.lat},${origins.lng}&destination=${destination.lat},${destination.lng}&key=${myApiKey}&mode=driving`,
            )
                .then(response => response.json())
                .then((responseJson: DirectionResponsePayload) => {
                    if (responseJson.status === 'OK') {
                        let points = Polyline.decode(
                            responseJson.routes[0].overview_polyline.points,
                        );
                        let coords = points.map((point: any[], _: any) => {
                            return {
                                latitude: point[0],
                                longitude: point[1],
                            };
                        });
                        resolve(coords);
                    } else {
                        reject('not found');
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        },
    );
}
