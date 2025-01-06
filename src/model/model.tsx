/* GoogleAddressAutoCompletePayload Start */
export interface GoogleAddressAutoCompletePayload {
    predictions: Predictions[];
}

export interface Predictions {
    description?: string;
    matched_substrings?: [{ [key: string]: any }];
    place_id?: string;
    reference?: string;
    structured_formatting?: { [key: string]: any };
    terms?: [{ [key: string]: any }];
    types?: string[];
}
/* GoogleAddressAutoCompletePayload End */

/* GEOCodePayload Start */
export interface GEOCodePayload {
    html_attributions: unknown[];
    result: GEOCodeResult;
    status: string;
}

export interface GEOCodeResult {
    address_components: [{ [key: string]: any }];
    adr_address: string;
    formatted_address: string;
    geometry: GeoMetry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    photos: [{ [key: string]: any }];
    place_id: string;
    reference: string;
    types: string[];
    url: string;
    utc_offset: number;
    vicinity: string;
}

export interface GeoMetry {
    location: CommonGeoMetry;
    viewport: ViewPort;
}

interface ViewPort {
    northeast: CommonGeoMetry;
    southwest: CommonGeoMetry;
}

export interface CommonGeoMetry {
    lat: number;
    lng: number;
}
/* GEOCodePayload End */

/* CommonRequestPayload Start */
export interface CommonRequestPayload {
    origins: CommonGeoMetry;
    destination: CommonGeoMetry;
}
/* CommonRequestPayload End */

/* DistanceAndDurationResponsePayload Start */
export interface DistanceAndDurationResponsePayload {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Rows[];
    status: string;
}

export interface Rows {
    elements: Elements[];
}

interface Elements {
    distance: ElementCommonType;
    duration: ElementCommonType;
}

interface ElementCommonType {
    text: string;
    value: number;
}
/* DistanceAndDurationResponsePayload End */

/* DirectionResponsePayload Start */
export interface DirectionResponsePayload {
    geocoded_waypoints: GeoCodedWayPoint[];
    routes: Routes[];
    status: string;
}

interface GeoCodedWayPoint {
    geocoder_status: string;
    place_id: string;
    types: string[];
}

interface Routes {
    overview_polyline: { points: string };
}
/* DirectionResponsePayload End */

/* TrackStream Model Start */
export interface TrackStreamModel {
    id: string;
    ride_no: string;
    device_id: string;
    latitude: string | number;
    longitude: string | number;
    created_at?: { nanos: number; seconds: number };
}
/* TrackStream Model End */
