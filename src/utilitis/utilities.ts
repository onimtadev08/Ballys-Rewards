import { Platform } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

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