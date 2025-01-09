import { PermissionsAndroid, Platform } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

export const myApiKey = 'AIzaSyBRXYQn2i47IoBhiJ14jjM9DjV_lxpV2Vg'; //'AIzaSyBRXYQn2i47IoBhiJ14jjM9DjV_lxpV2Vg';

export const LocationPermissionStatus = async () => {
  if (Platform.OS === 'ios') {
    const response = await Permissions.checkMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
    if (
      response['ios.permission.LOCATION_ALWAYS'] === 'blocked' ||
      response['ios.permission.LOCATION_WHEN_IN_USE'] === 'blocked' ||
      response['ios.permission.LOCATION_ALWAYS'] === 'denied' ||
      response['ios.permission.LOCATION_WHEN_IN_USE'] === 'denied'
    ) {
      const permision = await LocationRequestPermission();
      return permision;
    }
  } else {
    const response = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('response : ', response);

    console.log(
      'response : ', response.toString() !== PermissionsAndroid.RESULTS.GRANTED);


    if (response.toString() !== PermissionsAndroid.RESULTS.GRANTED) {
      const permision = await LocationRequestPermission();
      return permision;
    }
  }
};

const LocationRequestPermission = async () => {
  if (Platform.OS === 'ios') {
    const response = await Permissions.requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
    return (
      response['ios.permission.LOCATION_ALWAYS'] ||
      response['ios.permission.LOCATION_WHEN_IN_USE']
    );
  } else {
    const reponse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('reponse : ', reponse);

    return reponse;
  }
};

export const permissionStatus = async () => {
  if (Platform.OS === 'ios') {
    const response = await Permissions.checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]);
    if (
      response['ios.permission.CAMERA'] === 'blocked' ||
      response['ios.permission.PHOTO_LIBRARY'] === 'blocked' ||
      response['ios.permission.CAMERA'] === 'denied' ||
      response['ios.permission.PHOTO_LIBRARY'] === 'denied'
    ) {
      const permision = await requestPermission();
      return permision;
    }
  } else {
    const response = await Permissions.check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (response === 'denied' || response === 'blocked') {
      const permision = await requestPermission();
      return permision;
    }
  }
};

const requestPermission = async () => {
  if (Platform.OS === 'ios') {
    const response = await Permissions.requestMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]);
    return (
      response['ios.permission.CAMERA'] ||
      response['ios.permission.PHOTO_LIBRARY']
    );
  } else {
    const reponse = await Permissions.request(
      PERMISSIONS.ANDROID.CAMERA,
    );
    return reponse;
  }
};


export async function getBase64ImageFromUrl(imageUrl: string) {
  var res = await fetch(imageUrl);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(null);
    };
    reader.readAsDataURL(blob);
  })
}



export function ThousandSeparator(value: string) {

  if (value !== undefined) {

    const number = parseFloat(value.toString().replace(/,/g, '')); // Remove existing commas
    if (isNaN(number)) return '';
    return new Intl.NumberFormat().format(number);
  } else {
    return '';
  }
};


export const calculateHeading = (
  cord1: { latitude: number; longitude: number },
  cord2: { latitude: number; longitude: number },
) => {
  if (cord2) {
    const { latitude: lat1, longitude: lng1 } = cord1;
    const { latitude: lat2, longitude: lng2 } = cord2;
    const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
    const θ = Math.atan2(y, x);
    const brng = ((θ * 180) / Math.PI + 360) % 360;
    return brng;
  }
  return 0;
};