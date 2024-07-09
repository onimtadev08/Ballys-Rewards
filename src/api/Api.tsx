
import { Domain } from "../data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getOtpUrl = Domain + '/api/Ballys/GetOTP';

const VaidateOTPUrl = Domain + '/api/Ballys/ValidateOTP';



// get otp
export async function getOtp(PlayerID: string, ClientID: string) {

    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strClientID: ClientID,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(getOtpUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}

// sign in temp and original
export async function TempLogin(PlayerID: string, PIN: string, Token: string, Method: string) {

    let method = Method === 'TEMP' ? 'CheckFirstTimeLogin' : 'SignIn';
    let Url = Domain + '/api/Ballys/' + method;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strPIN: PIN,
        strToken: Token,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(Url, requestOptions);
    if (!response.ok) {
        console.log(response);
        throw new Error('Server Connection error');
    }
    return response.json();
}


export async function VaidateOTP(PlayerID: string, OTP: string) {
    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strOTP: OTP,
    });

    console.log(raw);


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(VaidateOTPUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}


export async function ResendOTP(PlayerID: string, OTP: string) {
    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strOTP: OTP,
    });

    console.log(raw);


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(VaidateOTPUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}